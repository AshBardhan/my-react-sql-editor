import './Content.scss';
import Button from "./Button";
import { useState } from 'react';

export default function Content({selectedQuery}) {
    const [state, setState] = useState({
		filterName: '',
        filterOption: 0,
	});

    const filterOptions = [5, 10, 15, 20];

	const handleChange = (evt) => {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	};

    return (
        <div className="content">
        {
            selectedQuery ?
            (
                <>
                <div className='query-box'>
                    <div>
                        <label htmlFor="query-name">Query Name</label>
                        <input type='text' name="query-name" className="input-text" id="query-name" value={selectedQuery.name}/>
                    </div>
                    <div>
                        <label htmlFor="query-input">SQL Query Input</label>
                        <textarea name="query-input" className="text-area" id="query-input" value={selectedQuery.input}></textarea>
                    </div>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <Button theme='primary' isInverted="true" label="Run"/>
                    </div>
                </div>

                <div className="query-result" style={{flexGrow: '1', display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <h3>Results</h3>
                    <div style={{display: 'flex', gap: '20px', flexShrink: '0'}}>
                        <div>
                            <label htmlFor="filterName">Search to filter results</label>
                            <input type="text" id="filterName" name="filterName" className="input-text" value={state.filterName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="filter-items">Shows results per page</label>
                            <select id="filterOption" name="filterOption" className="input-text" value={state.filterOption} onChange={handleChange}>
                                {filterOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{flexGrow: '1'}}>

                    </div>
                </div>
                </>
            ) 
        :
            (
                <div className="no-query-box">
                    <h4>No Query Selected</h4>
                    <p>Kindly select an existing query from the list</p>
                </div>
            )
        }
        </div>
    )
}