import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <div className="App" style={{display: 'flex', gap: '20px', flexDirection: 'column', padding: '20px', height: '100vh'}}>
      <div style={{flexShrink: '0'}}>
        <Header/>
      </div>
      <div style={{flexGrow: '1'}}>
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;
