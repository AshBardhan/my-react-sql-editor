import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { useState } from 'react';
import './App.scss';
import { initialQueryData } from './shared/QueryData';

function App() {
  const [queryList, setQueryList] = useState(initialQueryData);
  const [selectedQuery, setSelectedQuery] = useState(null);

  return (
    <div className="app">
      <Header/>
      <Dashboard
        queryList={queryList}
        selectedQuery={selectedQuery}
        onQuerySelect={(query) => setSelectedQuery(query)}
      />
    </div>
  );
}

export default App;
