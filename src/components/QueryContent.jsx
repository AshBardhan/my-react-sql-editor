import './QueryContent.scss';
import Button from './Button';
import {useEffect, useMemo, useRef, useState} from 'react';
import {downloadFile} from '../utils/fileUtils';

export default function QueryContent({queryId, query, queryResult, fetchQueryResult, updateQuery, deleteQuery, isResultLoading}) {
	const [filterName, setFilterName] = useState('');
	const [filterCategory, setFilterCategory] = useState('');
	const [tempQuery, setTempQuery] = useState();
	const [changed, setChanged] = useState(false);
	const queryNameInputRef = useRef(null);

	const filteredResult = useMemo(() => {
		if (filterCategory.length > 0 && filterName.length > 0 && queryResult?.headers.indexOf(filterCategory) !== -1) {
			return queryResult?.data.filter((result) => result[filterCategory].toLowerCase().includes(filterName.toLowerCase())) || [];
		}
		return queryResult?.data || [];
	}, [queryResult, filterCategory, filterName]);

	useEffect(() => {
		queryNameInputRef.current?.focus();
		setTempQuery({...query});
		setChanged(false);
		setFilterName('');
		setFilterCategory('');
	}, [query, queryId]);

	const handleFilterCategoryChange = (evt) => {
		setFilterCategory(evt.target.value);
	};

	const handleFilterNameChange = (evt) => {
		setFilterName(evt.target.value);
	};

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
								<h2>{filteredResult.length} Results</h2>
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
									<label htmlFor="filter-items">Filter By</label>
									<select id="filterCategory" name="filterCategory" className="input-text" value={filterCategory} onChange={handleFilterCategoryChange}>
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
									<label htmlFor="filterName">Filter Name</label>
									<input type="text" id="filterName" name="filterName" className="input-text" value={filterName} onChange={handleFilterNameChange} />
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
					<h3>No Query Selected</h3>
					<p>Kindly select an existing query from the list</p>
				</div>
			)}
		</div>
	);
}
