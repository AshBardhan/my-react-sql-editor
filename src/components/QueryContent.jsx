import './QueryContent.scss';
import Button from './Button';
import {useMemo, useState} from 'react';
import {useQueryManager} from '../hooks/useQueryManager';

export default function QueryContent({queryId}) {
	const [filterName, setFilterName] = useState('');
	const [filterCategory, setFilterCategory] = useState('');
	const {getQueryById, getQueryResultById, fetchQueryResult, updateQuery, isResultLoading} = useQueryManager();
	const query = getQueryById(queryId);
	const queryResult = getQueryResultById(queryId);
	const filteredResult = useMemo(() => {
		if (filterCategory.length > 0 && filterName.length > 0) {
			return queryResult?.data.filter((result) => result[filterCategory].toLowerCase().includes(filterName.toLowerCase())) || [];
		}
		return queryResult?.data || [];
	}, [queryResult, filterName, filterCategory]);

	const handleFilterCategoryChange = (evt) => {
		setFilterCategory(evt.target.value);
	};

	const handleFilterNameChange = (evt) => {
		setFilterName(evt.target.value);
	};

	const handleQueryNameChange = (name) => {
		updateQuery({...query, name}, queryId);
	};

	const handleQueryCodeChange = (code) => {
		updateQuery({...query, code}, queryId);
	};

	return (
		<div className="content">
			{query ? (
				<>
					<div className="query-box">
						<div>
							<label htmlFor="queryName">Query Name</label>
							<input type="text" name="queryName" className="input-text" id="queryName" value={query.name} onChange={(e) => handleQueryNameChange(e.target.value)} />
						</div>
						<div>
							<label htmlFor="queryCode">SQL Code</label>
							<textarea name="queryCode" className="text-area" id="queryCode" value={query.code} onChange={(e) => handleQueryCodeChange(e.target.value)}></textarea>
						</div>
						<div style={{display: 'flex', gap: '20px'}}>
							<Button theme="primary" isInverted="true" label="Run" handleClick={() => fetchQueryResult(query)} />
						</div>
					</div>
					{isResultLoading ? (
						<div className="loading-query-result">Loading query result...</div>
					) : queryResult ? (
						<div className="query-result">
							<div>
								<h3>{filteredResult.length} Results</h3>
								<div style={{display: 'flex', gap: '20px'}}>
									<div style={{flexGrow: '1'}}>
										<label htmlFor="filter-items">Filter By</label>
										<select id="filterCategory" name="filterCategory" className="input-text" value={filterCategory} onChange={handleFilterCategoryChange}>
											{queryResult.headers.map((option, index) => (
												<option key={index} value={option}>
													{option}
												</option>
											))}
										</select>
									</div>
									<div style={{flexGrow: '1'}}>
										<label htmlFor="filterName">Filter Name</label>
										<input type="text" id="filterName" name="filterName" className="input-text" value={filterName} onChange={handleFilterNameChange} />
									</div>
								</div>
							</div>
							<div className="table-wrapper">
								<table>
									<thead>
										<tr>
											{queryResult.headers.map((title, i) => (
												<th key={i}>{title}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{filteredResult.length ? (
											filteredResult.map((row, i) => (
												<tr key={i}>
													{Object.keys(row).map((column, j) => (
														<td key={j}>{row[column]}</td>
													))}
												</tr>
											))
										) : (
											<tr>
												<td style={{textAlign: 'center'}} colSpan={queryResult.headers.length}>
													No results found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<div className="no-query-result">Results will be displayed once you 'Run' the above query</div>
					)}
				</>
			) : (
				<div className="no-query-box">
					<h4>No Query Selected</h4>
					<p>Kindly select an existing query from the list</p>
				</div>
			)}
		</div>
	);
}
