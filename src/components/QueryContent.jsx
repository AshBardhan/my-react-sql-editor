import './QueryContent.scss';
import Button from "./Button";
import { useState } from 'react';
import { useQueryManager } from '../hooks/useQueryManager';

export default function QueryContent({queryId}) {
    const {getQueryById, getQueryResultById, fetchQueryResult, updateQuery, isResultLoading} = useQueryManager();
    const query = getQueryById(queryId);
    const queryResult = getQueryResultById(queryId);

    const [state, setState] = useState({
		filterName: '',
        filterOption: 0
	});

    const filterOptions = [5, 10, 15, 20];

	const handleChange = (evt) => {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	};

    const handleQueryNameChange = (name) => {
        updateQuery({...query, name}, queryId);
    };

    const handleQueryCodeChange = (code) => {
        updateQuery({...query, code}, queryId);
    };

    return (
        <div className={`content ${isResultLoading}`}>
        {
            query ?
            (
                <>
                <div className='query-box'>
                    <div>
                        <label htmlFor="queryName">Query Name</label>
                        <input type='text' name="queryName" className="input-text"
                            id="queryName" value={query.name}
                            onChange={(e) => handleQueryNameChange(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="queryCode">SQL Code</label>
                        <textarea name="queryCode" className="text-area" id="queryCode"
                            value={query.code} onChange={(e) => handleQueryCodeChange(e.target.value)}></textarea>
                    </div>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <Button theme='primary' isInverted="true" label="Run" handleClick={() => fetchQueryResult(query)}/>
                    </div>
                </div>
                {
                    isResultLoading ?
                    (
                        <div className='loading-query-result'>
                            Loading query result...
                        </div>
                    )
                    :
                    queryResult ?
                    (
                        <div className="query-result">
                            <div>
                                <h3>{queryResult.data.length} Query Results</h3>
                                <div style={{display: 'flex', gap: '20px'}}>
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
                            </div>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            {queryResult.headers.map((h, i) => (
                                                <th>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queryResult.data.map((row) => (
                                            <tr>
                                                {Object.keys(row).map((column) => (
                                                    <td>{row[column]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='no-query-result'>
                            Results will be displayed once you 'Run' the above query
                        </div>
                    )
                }
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