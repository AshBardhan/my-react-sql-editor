import React from 'react';
import './ToggleSwitch.scss';

export default function ToggleSwitch({checked, onChange}) {
	return (
		<div className="toggle-switch">
			<input type="checkbox" className="toggle-switch-checkbox" name="toggle-switch" id="toggle-switch" checked={checked} onChange={(e) => onChange(e)} />
			<label className="toggle-switch-label" htmlFor="toggle-switch">
				<span className="toggle-switch-ball"></span>
			</label>
		</div>
	);
}
