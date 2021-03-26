import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io, Socket } from 'socket.io-client';

import './chat.css';
import Infobar from '../../components/Infobar';
import Input from '../../components/Infobar/Input';
import Messages from '../../components/Infobar/Messages';
const ENDPOINT = 'localhost:5000';
let socket: Socket;
export interface IChatProps {}
export interface IMessage {
  text: string;
  user: string;
}
export function Chat(props: IChatProps) {
  const [name, setName] = useState<string | null>('');
  const [room, setRoom] = useState<string | null>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT, { withCredentials: true });
    setName(name as string);
    setRoom(room as string);
    socket.emit('join', { name, room }, () => {});
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);
  useEffect(() => {
    socket.on('message', (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);
  const sendMessage = (message: string) => {
    socket.emit('sendMessage', message);
  };

  if (!room) {
    return <div>No room selected</div>;
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name!} />
        <Input sendMessage={sendMessage} />
      </div>
    </div>
  );
}
