import { useState } from "react";
import './QueryResult.scss';

export default function QueryResult() {
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
                        {filterOptions.map((option) => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{flexGrow: '1'}}>
   
            </div>
        </div>
    )
}