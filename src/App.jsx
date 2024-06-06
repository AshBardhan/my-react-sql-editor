import React, {useState} from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ToggleSwitch from './components/ToggleSwitch';
import './App.scss';

function App() {
	const [isThemeDark, setIsThemeDark] = useState(false);

	return (
		<div className={`app ${isThemeDark ? 'app--dark' : ''}`}>
			<Header>
				<h1>SQL Report Dashboard</h1>
				<ToggleSwitch onChange={() => setIsThemeDark(!isThemeDark)} />
			</Header>
			<Dashboard />
		</div>
	);
}

export default App;
