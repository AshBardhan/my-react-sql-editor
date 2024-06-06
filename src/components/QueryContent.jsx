import Button from './Button';
import {useEffect, useMemo, useRef, useState} from 'react';
import {downloadFile} from '../utils/fileUtils';
import './QueryContent.scss';

export default function QueryContent({queryId, query, queryResult, fetchQueryResult, updateQuery, deleteQuery, isResultLoading}) {
	const [filter, setFilter] = useState({
		name: '',
		category: '',
	});
	const [tempQuery, setTempQuery] = useState();
	const [changed, setChanged] = useState(false);
	const queryNameInputRef = useRef(null);

	const filteredResult = useMemo(() => {
		if (filter.category.length > 0 && filter.name.length > 0 && queryResult?.headers.indexOf(filter.category) !== -1) {
			return queryResult?.data.filter((result) => result[filter.category].toLowerCase().includes(filter.name.toLowerCase())) || [];
		}
		return queryResult?.data || [];
	}, [queryResult, filter]);

	useEffect(() => {
		queryNameInputRef.current?.focus();
		setTempQuery({...query});
		setChanged(false);
		setFilter({
			name: '',
			category: '',
		});
	}, [query, queryId]);

	function onFilterInputChange(e) {
		e.preventDefault();
		setFilter({
			...filter,
			[e.target.name]: e.target.value,
		});
	}

	function updateQueryForm(e) {
		e.preventDefault();
		updateQuery({...tempQuery}, queryId);
		setChanged(false);
	}

	function discardQueryForm(e) {
		e.preventDefault();
		setTempQuery({...query});
		setChanged(false);
	}

	return (
		<div className="content">
			{query && tempQuery ? (
				<>
					<form className="query-box" id="query" onSubmit={updateQueryForm}>
						<div>
							<label htmlFor="queryName">Query Name</label>
							<input
								type="text"
								name="queryName"
								className="input-text"
								ref={queryNameInputRef}
								id="queryName"
								value={tempQuery.name || ''}
								onChange={(e) => {
									setChanged(true);
									setTempQuery({
										...tempQuery,
										name: e.target.value,
									});
								}}
							/>
						</div>
						<div>
							<label htmlFor="queryCode">SQL Code</label>
							<textarea
								name="queryCode"
								className="text-area"
								id="queryCode"
								value={tempQuery.code || ''}
								onChange={(e) => {
									setChanged(true);
									setTempQuery({
										...tempQuery,
										code: e.target.value,
									});
								}}></textarea>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<div style={{display: 'flex', gap: '10px'}}>
								<Button theme="primary" isInverted="true" label="Run" handleClick={() => fetchQueryResult(query, queryId)} />
								<Button theme="negative" isInverted="true" label="Delete" handleClick={() => deleteQuery(queryId)} />
							</div>
							<div className={`form-action-buttons ${changed ? 'show' : ''}`}>
								<Button type="submit" theme="positive" isInverted="true" label="Save" />
								<Button label="Discard" handleClick={(e) => discardQueryForm(e)} />
							</div>
						</div>
					</form>
					{isResultLoading ? (
						<div className="loading-query-result">Loading query result...</div>
					) : queryResult ? (
						<div className="query-result">
							<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
								<h2>
									{filteredResult.length} Result{filteredResult.length !== 1 ? 's' : ''}
								</h2>
								<div style={{display: 'flex', gap: '10px'}}>
									<Button
										theme="primary"
										size="small"
										isInverted="true"
										label="Export JSON"
										disabled={!filteredResult.length}
										handleClick={() => downloadFile(filteredResult, `Report-${query.name}`, 'pdf')}
									/>
									<Button
										theme="primary"
										size="small"
										isInverted="true"
										label="Export CSV"
										disabled={!filteredResult.length}
										handleClick={() => downloadFile(filteredResult, `Report-${query.name}`, 'csv')}
									/>
								</div>
							</div>
							<div style={{display: 'flex', gap: '20px'}}>
								<div style={{flexGrow: '1'}}>
									<label htmlFor="category">Filter By</label>
									<select id="category" name="category" className="input-text" value={filter.category} onChange={onFilterInputChange}>
										<option disabled={true} value="">
											Choose Cateogory
										</option>
										{queryResult.headers.map((option, index) => (
											<option key={index} value={option}>
												{option}
											</option>
										))}
									</select>
								</div>
								<div style={{flexGrow: '1'}}>
									<label htmlFor="name">Filter Name</label>
									<input type="text" id="name" name="name" className="input-text" value={filter.name} onChange={onFilterInputChange} />
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
												<td colSpan={queryResult.headers.length}>No results found</td>
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
					<h3>No Query Selected</h3>
					<p>Kindly select an existing query from the list</p>
				</div>
			)}
		</div>
	);
}
