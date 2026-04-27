"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, User } from "lucide-react";
import { chatWithAI } from "@/actions/ai";

const SUGGESTIONS = [
  "Can I afford a $3,000 trip to Kenya?",
  "Should I buy a PS5 right now?",
  "How much am I spending on food?",
  "Am I on track with my savings?",
  "Where can I cut back this month?",
];

const Message = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? "bg-blue-700" : "bg-gradient-to-br from-[#185FA5] to-[#5dcaa5]"}`}>
        {isUser ? <User size={13} className="text-white" /> : <Sparkles size={13} className="text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "bg-blue-700 text-white rounded-tr-sm" : "bg-white/[0.05] border border-white/[0.08] text-slate-200 rounded-tl-sm"}`}>
        {msg.content}
      </div>
    </div>
  );
};

const AiChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm your FinCoach AI 👋 I have access to your full financial data. Ask me anything — like whether you can afford something, how your spending looks, or where to save more." },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSend = async (text) => {
    const message = text || input.trim();
    if (!message || loading) return;
    setInput("");
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    const history = newMessages.slice(1, -1);
    try {
      const result = await chatWithAI(message, history);
      if (result?.success && result?.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: result.message }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I didn't get a response. Please try again." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: err.message?.includes("429") ? "Too many requests right now. Please wait a moment ⏳" : `Sorry, something went wrong: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-2 left-2 sm:left-auto sm:right-6 sm:w-[380px] z-50 flex flex-col rounded-2xl overflow-hidden border border-white/[0.1]"
          style={{ background: "#0a1017", boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)", height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] shrink-0" style={{ background: "linear-gradient(135deg,#0d1b2e,#0a1520)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#185FA5,#5dcaa5)" }}>
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">FinCoach AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] text-teal-400 font-medium">Online · knows your finances</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <X size={13} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#185FA5] to-[#5dcaa5] flex items-center justify-center shrink-0">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">Try asking</div>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => handleSend(s)} className="block w-full text-left text-xs text-slate-400 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-slate-200 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06] shrink-0">
            <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-blue-700/40 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your finances..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none max-h-24"
                style={{ lineHeight: "1.5" }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
                style={{ background: input.trim() && !loading ? "linear-gradient(135deg,#185FA5,#1a7cc7)" : "rgba(255,255,255,0.05)" }}
              >
                {loading ? <Loader2 size={13} className="text-white animate-spin" /> : <Send size={13} className="text-white" />}
              </button>
            </div>
            <div className="text-[10px] text-slate-700 text-center mt-2">Enter to send · Shift+Enter for new line</div>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{ background: open ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#185FA5,#1a7cc7)", boxShadow: open ? "none" : "0 8px 32px rgba(24,95,165,0.5), 0 0 0 1px rgba(91,168,232,0.3)" }}
      >
        {open ? <X size={20} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        {!open && <span className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)" }} />}
      </button>
    </>
  );
};

export default AiChat;