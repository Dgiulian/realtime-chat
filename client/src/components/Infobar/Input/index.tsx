import React from 'react';
import { useState } from 'react';
import './input.css';

export interface IInputProps {
  sendMessage: (message: string) => void;
}

export default function Input({ sendMessage }: IInputProps) {
  const [message, setMessage] = useState<string>('');
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      event.preventDefault();
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form action="" className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button
        type="button"
        className="sendButton"
        onClick={(event) => {
          event.preventDefault();
          sendMessage(message);
          setMessage('');
        }}
      >
        Send
      </button>
    </form>
  );
}
