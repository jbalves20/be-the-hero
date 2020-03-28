import React from 'react';
import Routes from './routes';

import './global.css';

// useState() returns an array with the value and the functino for the value update: [value, setValue].
function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
