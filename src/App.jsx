import {ThemeProvider} from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import './App.scss';

function App() {
	return (
		<ThemeProvider>
			<HomePage />
		</ThemeProvider>
	);
}

export default App;
