import {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
import './ToggleSwitch.scss';

export default function ToggleSwitch() {
	const {toggleTheme, theme} = useContext(ThemeContext);

	return (
		<div className="toggle-switch">
			<input type="checkbox" className="toggle-switch-checkbox" name="toggle-switch" id="toggle-switch" checked={theme === 'dark'} onChange={() => toggleTheme()} />
			<label className="toggle-switch-label" htmlFor="toggle-switch">
				<span className="toggle-switch-ball"></span>
			</label>
		</div>
	);
}
