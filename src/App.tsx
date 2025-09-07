import { useState } from 'react';
import Terminal from './components/TerminalRefactored';
import './App.css';

function App() {
  const [, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="w-full h-screen bg-black">
      <Terminal onAuthenticated={handleAuthentication} />
    </div>
  );
}

export default App;