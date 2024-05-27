import Button from './Button';
import './QueryBox.scss';

export default function QueryBox() {
    return (
        <div className='query-box'>
            <div style={{flexGrow: '1'}}>
                <label htmlFor="query-input">Enter your SQL Query</label>
                <textarea name="query-input" className="text-area" id="query-input"></textarea>
            </div>
            <div style={{flexShrink: '0', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Button theme='primary' isInverted="true" label="Run"/>
                <Button theme='positive' label="Save"/>
                <Button label="Reset"/>
            </div>
        </div>
    )
}