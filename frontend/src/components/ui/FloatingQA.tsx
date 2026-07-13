"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function FloatingQA() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: 'Hi! Ask me anything about the concepts in this section or how they relate to your previous papers.' }
  ]);

  const handleSend = () => {
    if (query.trim()) {
      setMessages([...messages, { role: 'user', text: query }]);
      setQuery("");
      // Mock response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'agent', text: 'Based on your memory graph, this relates to the RNN architecture you read about yesterday.' }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-forest-teal text-bone-white rounded-full flex items-center justify-center shadow-subtle z-40 hover:bg-forest-teal/90 transition-colors"
      >
        <MessageSquare size={24} strokeWidth={1.5} />
      </motion.button>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 w-full max-w-[380px] h-[500px] bg-bone-white shadow-subtle border border-ash/30 z-50 flex flex-col rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ash bg-bone-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-forest-teal rounded-full animate-pulse" />
                <span className="text-[12px] uppercase tracking-normal">Context-Aware Q&A</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-graphite hover:text-ink-black">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-[14px] leading-[1.4] ${
                    msg.role === 'user' 
                      ? 'bg-ink-black text-bone-white rounded-t-[16px] rounded-bl-[16px] rounded-br-sm' 
                      : 'bg-ash/10 text-ink-black rounded-t-[16px] rounded-br-[16px] rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-ash bg-bone-white flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about this concept..."
                className="flex-grow bg-transparent border border-ash rounded-[1440px] px-4 py-2 text-[14px] focus:outline-none focus:border-ink-black"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-ink-black text-bone-white rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Send size={16} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
