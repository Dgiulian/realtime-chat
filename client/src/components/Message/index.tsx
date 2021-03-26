import * as React from 'react';
import { IMessage } from '../../views/Chat/chat';
import ReactEmoji from 'react-emoji';

import './message.css';

export interface IMessageProps {
  message: IMessage;
  name: string;
}

export default function Message({ message, name }: IMessageProps) {
  const isSentByCurrentUser = name.trim().toLocaleLowerCase() === message.user;
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        <div className="messageText colorWhite">
          {ReactEmoji.emojify(message.text)}
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <div className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </div>
      </div>
      <p className="sentText pl-10">{message.user}</p>
    </div>
  );
}
