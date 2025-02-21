import React from 'react';

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';


const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        
      </div>
    </div>
  );
};

export default App;