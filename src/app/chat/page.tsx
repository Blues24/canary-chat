"use client";

import { useEffect, useState } from "react";
import { addMessage, getMessages, deleteMessage } from "../lib/firebase";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!text.trim()) return;
    await addMessage("User", text); // Ganti "User" dengan nama pengguna sesungguhnya
    setText(""); // Kosongkan input setelah pesan terkirim
    const updatedMessages = await getMessages();
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteMessage(id);
    const updatedMessages = await getMessages();
    setMessages(updatedMessages);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-fg">
      <h1 className="text-4xl font-bold text-blue">Chat Room</h1>
      {loading ? (
        <p className="mt-4 text-lg">Loading messages...</p>
      ) : (
        <div className="w-full max-w-lg mt-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center justify-between p-2 bg-cyan rounded"
            >
              <div>
                <p className="font-bold text-yellow">{msg.sender}</p>
                <p>{msg.text}</p>
              </div>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="px-2 py-1 text-bg bg-red rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex w-full max-w-lg mt-4 space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 bg-bg border border-fg rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-green text-bg rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
