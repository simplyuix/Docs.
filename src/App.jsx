
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Background from './components/Background';
import Foreground from './components/Foreground';
import CreateCard from './components/CreateCard'; 

function App() {
  return (
    <Router> {}
      <div className='relative w-full h-screen bg-zinc-800'>
        <Background /> {}

        <Routes> {}
          <Route path="/" element={<Foreground />} /> {}
          <Route path="/create" element={<CreateCard />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;