import React, { useState } from "react";

const initialMessages = [
  { role: "assistant", content: "Hi! Welcome to QualityFarm! 🌾 I'm your AI assistant and I'm here to help you find the perfect agricultural equipment and provide farming advice. How can I assist you today?" }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://qualityfarm-b-1.onrender.com/api/ai/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const aiReply = data.response || "Sorry, I couldn't process that request.";
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("AI Assistant error:", error);
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team for assistance with your farming needs." 
      }]);
    }
    setLoading(false);
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* Floating round button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl z-50"
          aria-label="Open AI Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col max-h-[600px]">
          <div className="p-4 border-b border-gray-100 bg-green-500 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div>
                <span className="font-semibold">QualityFarm AI Assistant</span>
                <p className="text-xs text-green-100">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearChat}
                className="bg-green-400 hover:bg-green-300 text-white px-3 py-1 rounded-md text-sm transition-colors"
                aria-label="Clear Chat"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-green-100 text-xl font-bold"
                aria-label="Close"
              >×</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-green-500 text-white rounded-br-sm" 
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about farming equipment, tips, or anything agriculture-related..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                disabled={loading}
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-full transition-colors flex items-center justify-center min-w-[60px]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;