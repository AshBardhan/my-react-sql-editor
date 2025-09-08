import {useContext} from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import {ThemeContext} from '../contexts/ThemeContext';

export default function HomePage() {
	const {theme} = useContext(ThemeContext);

	return (
		<div className={`app app--${theme}`}>
			<Header>
				<h1>SQL Report Dashboard</h1>
				<ToggleSwitch />
			</Header>
			<Dashboard />
		</div>
	);
}
