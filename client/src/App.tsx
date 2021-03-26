import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './views/Join';
import Chat from './views/Chat';

export default function App() {
  return (
    <main>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </main>
  );
}
