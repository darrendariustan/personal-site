"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "init-msg", role: "assistant", content: "Hi! I'm Darren's digital twin. Ask me anything about my career, skills, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content }))
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: `Error: ${data.error || "Oops, something went wrong on my end."}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "Connection error. Please check your network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 w-full h-[100dvh] sm:h-[500px] sm:w-[400px] sm:bottom-6 sm:right-6 sm:rounded-2xl flex flex-col overflow-hidden z-50 sm:border sm:border-slate-700/50 shadow-2xl bg-slate-900/95 sm:bg-slate-900/80 backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <h3 className="font-semibold text-white">Darren AI Twin</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700/50'}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-700/50">
                    <Loader2 size={16} className="text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-800 border-t border-slate-700/50">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
