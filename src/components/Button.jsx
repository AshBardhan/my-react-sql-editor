import './Button.scss';

export default function Button({type = 'button', size = '', theme = '', isInverted = false, isFull = false, disabled = false, label, handleClick}) {
	const setClassname = () => {
		return `btn${size ? ` btn--${size}` : ''}${theme ? ` btn--${theme}` : ''}${isInverted ? ` btn--inverted` : ''}${isFull ? ` btn--full` : ''}`;
	};
	return (
		<button type={type} disabled={disabled} onClick={handleClick} className={setClassname()}>
			{label}
		</button>
	);
}
