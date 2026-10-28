import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface AgroChatProps {
  initialCropContext?: string;
}

export const AgroChat: React.FC<AgroChatProps> = ({ initialCropContext }) => {
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text:
        language === 'om'
          ? "Akkam jirtu! Ani Gorsaa Qonnaa AI (AgroAI) ti. Waa'ee dhibee biqiltootaa, xaa'oo uumamaa, haala qilleensaafi mala qonnaa ammayyaa maal beekuu barbaaddu?"
          : language === 'am'
          ? "ጤና ይስጥልኝ! እኔ የ AgroAI የግብርና ኤክስቴንሽን ረዳት ነኝ። ስለ ሰብል በሽታዎች፣ ተፈጥሯዊ ማዳበሪያ፣ እና ዘመናዊ የግብርና አሰራር ምን ማወቅ ይፈልጋሉ?"
          : "Hello! I am your AI Agronomist and Extension Officer. How can I assist you today with crop protection, fertilization, or disease control?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Quick prompt suggestions based on language
  const quickPrompts = {
    en: [
      "How to prepare organic neem leaf extract spray?",
      "Best row spacing & seed rate for Quncho Teff",
      "How to control Coffee Leaf Rust without expensive chemicals?",
      "Preventing Enset Bacterial Wilt when harvesting",
    ],
    om: [
      "Qoricha qulqulluu baala neemii akkamitti qopheessu?",
      "Xaafii Qunxoo tooraan facaasuuf hamma sanyii meeqa?",
      "Dhibee baala bunaa akkamitti qoricha malee to'anna?",
      "Bakteeriyaa Qochoo (Enset) akkamitti ittisuu dandeenya?",
    ],
    am: [
      "የኒም ቅጠል ተፈጥሯዊ ፀረ-ተባይ አዘገጃጀት እንዴት ነው?",
      "የቁንጮ ጤፍ የመስመር ዝርጋታ እና የዘር መጠን?",
      "የቡና ቅጠል ዝገትን ያለ ውድ ኬሚካል እንዴት መከላከል ይቻላል?",
      "የእንሰት ባክቴሪያ አወዛዋዥ በሽታን መከላከያ ዘዴዎች?",
    ],
  };

  const currentPrompts = quickPrompts[language] || quickPrompts.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.slice(-6),
          language,
          cropContext: initialCropContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: 'msg-' + Date.now() + '-reply',
        sender: 'assistant',
        text: data.reply || 'Thank you for your question. Always inspect your field regularly and consult your kebele development agent for localized advisories.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Chat API error, fallback response provided:', err);
      const fallbackText =
        language === 'om'
          ? "Gorsi qonnaa: Biqiltoota keessan guyyaa guyyaan sakatta'aa. Dhibeen yoo mul'ate baala dhukkubsate dafaa kutaa gubaa. Xaa'oo uumamaafi qoricha seera qabeessa fayyadamaa."
          : language === 'am'
          ? "የግብርና ምክር፡ ማሳዎን በየጊዜው ይጎብኙ። የበሽታ ምልክት የታየባቸውን ቅጠሎች ቆርጠው በማቃጠል ስርጭቱን ይግቱ። ኦርጋኒክ ማዳበሪያን ይጠቀሙ።"
          : "Agronomy advisory: Inspect your fields regularly during early morning. For fungal diseases, rogue out heavily infected foliage, ensure row spacing for air circulation, and apply compost to strengthen plant immunity.";

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now() + '-fallback',
          sender: 'assistant',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      window.speechSynthesis?.cancel();
      setSpeakingMsgId(null);
      return;
    }

    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-800/60 rounded-3xl p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold border border-emerald-700/60 mb-2">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Development Agent (D.A.)</span>
          </div>
          <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans']">
            {t.chatTitle}
          </h2>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1">
            {t.chatSubtitle}
          </p>
        </div>

        {initialCropContext && (
          <div className="bg-emerald-900/60 border border-amber-500/50 px-3.5 py-1.5 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Plot Focus: <strong>{initialCropContext}</strong></span>
          </div>
        )}
      </div>

      {/* Chat Messages Frame */}
      <div className="bg-stone-900/90 border border-emerald-900/50 rounded-3xl shadow-xl flex flex-col h-[520px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-emerald-800 text-emerald-200 border border-emerald-600/50'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-stone-950/80 text-stone-200 border border-stone-800 rounded-tl-none space-y-2'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  <div className="flex items-center justify-between pt-1 gap-4 text-[10px] text-stone-400">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className="hover:text-amber-400 transition flex items-center gap-1"
                        title="Read aloud"
                      >
                        {speakingMsgId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                        <span>{speakingMsgId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0 text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 text-stone-400 text-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>AI Agronomist is analyzing research recommendations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts */}
        <div className="p-3 bg-stone-950/70 border-t border-stone-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-stone-500 shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Quick:
          </span>
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-stone-900 hover:bg-emerald-950 hover:text-amber-300 text-stone-300 border border-stone-800 hover:border-emerald-700/60 px-3 py-1.5 rounded-xl whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-stone-900 border border-stone-700/80 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3 text-white text-xs sm:text-sm placeholder:text-stone-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className={`p-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center ${
              !input.trim() || loading
                ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
