import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../../Message';
interface IMessage {
  text: string;
  user: string;
}
export interface IMessagesProps {
  messages: IMessage[];
  name: string;
}

export default function Messages({ messages, name }: IMessagesProps) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
