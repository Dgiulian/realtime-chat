import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css';

export interface IJoinProps {}

export default function Join(props: IJoinProps) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="joinInput mt-2"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={(event) => (!name || !room) && event.preventDefault()}
        >
          <button type="button" className="button mt-20">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}
