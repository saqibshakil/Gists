import React from 'react'
import { createRoot } from 'react-dom/client';
import Gists from './components/Gists';

function App() {
  return (
      <Gists />
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
