import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header/>
      <Dashboard/>
    </div>
  );
}

export default App;
