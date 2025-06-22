import React, { useState } from "react";

const OPENAI_API_KEY = "";
const HF_API_KEY = "";

const initialMessages = [
  { role: "assistant", content: "Hi! How can I help you today?" }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // or "gpt-4" if you have access
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });
      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error contacting AI service." }]);
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
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#4ade80",
            color: "#fff",
            border: "none",
            boxShadow: "0 2px 8px #0002",
            fontSize: 28,
            cursor: "pointer",
            zIndex: 1000,
          }}
          aria-label="Open AI Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 350,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: 16,
          boxShadow: "0 2px 16px #0003",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{
            padding: 12,
            borderBottom: "1px solid #eee",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>AI Assistant</span>
            <div>
              <button
                onClick={handleClearChat}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "2px 10px",
                  marginRight: 8,
                  cursor: "pointer",
                  color: "#555",
                  fontSize: 13
                }}
                aria-label="Clear Chat"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#888"
                }}
                aria-label="Close"
              >×</button>
            </div>
          </div>
          <div style={{ maxHeight: 300, overflowY: "auto", padding: 12, flex: 1 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ margin: "8px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
                <span style={{ background: msg.role === "user" ? "#e0ffe0" : "#f0f0f0", padding: "6px 12px", borderRadius: 16, display: "inline-block" }}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div>AI is typing...</div>}
          </div>
          <form onSubmit={sendMessage} style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{ flex: 1, border: "none", padding: 10, outline: "none" }}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ padding: "0 16px", border: "none", background: "#4ade80", color: "#fff", borderRadius: "0 0 16px 0" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;