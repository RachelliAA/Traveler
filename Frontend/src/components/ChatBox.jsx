// import { useState } from "react";

// export default function Chatbox({ userId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     console.log("Sending message:", input);
//     const res = await fetch("http://localhost:5000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, message: input })
//     });

//     const data = await res.json();

//     setMessages(prev => [
//       ...prev,
//       { role: "user", text: input },
//       { role: "bot", text: data.reply }
//     ]);

//     setInput("");
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
//       <h2>✈️ Travel Assistant Bot</h2>
//       <div style={{
//         border: "1px solid #ccc",
//         borderRadius: 10,
//         padding: 10,
//         height: 300,
//         overflowY: "auto",
//         marginBottom: 10
//       }}>
//         {messages.map((m, i) => (
//           <div key={i} style={{ margin: "5px 0" }}>
//             <strong>{m.role === "user" ? "You" : "Bot"}:</strong> {m.text}
//           </div>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         placeholder="Ask me about your trips..."
//         style={{ width: "70%", padding: 8 }}
//       />
//       <button onClick={sendMessage} style={{ padding: "8px 12px" }}>Send</button>
//     </div>
//   );
// }


import { useState } from "react";

export default function Chatbox({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true); // start loading
    console.log("Sending message:", input);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: input })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "user", text: input },
        { role: "bot", text: data.reply }
      ]);

      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "❌ Failed to send message." }
      ]);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>✈️ Travel Assistant Bot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "5px 0" }}>
            <strong>{m.role === "user" ? "You" : "Bot"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask me about your trips..."
        style={{ width: "70%", padding: 8 }}
        disabled={loading} // disable input if loading
      />
      <button
        onClick={sendMessage}
        style={{ padding: "8px 12px" }}
        disabled={loading} // disable button if loading
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
