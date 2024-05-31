import {memo, useMemo, useState} from 'react';
import './QueryList.scss';
import Button from './Button';

function QueryList({queries, selectedQueryId, onQuerySelect, onCreateQuery}) {
	const [searchInput, setSearchInput] = useState('');
	const filteredQueries = useMemo(() => {
		if (searchInput.length > 0) {
			return queries.filter((query) => query.name.toLowerCase().includes(searchInput.toLowerCase()));
		}
		return queries;
	}, [queries, searchInput]);

	return (
		<div className="sidebar">
			<div className="query-search">
				<h3>Queries ({filteredQueries.length})</h3>
				<input
					type="text"
					className="input-text"
					name="query-search"
					placeholder="Search Query"
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
				/>
			</div>
			<ul className="query-list">
				{filteredQueries.map((queryItem, queryId) => (
					<li key={queryId} className={queryId === selectedQueryId ? 'selected' : ''} onClick={() => onQuerySelect(queryId)}>
						{queryItem.name}
					</li>
				))}
			</ul>
			<div className="query-action">
				<Button theme="primary" isFull="true" size="big" isInverted="true" label="Create New Query" handleClick={onCreateQuery} />
			</div>
		</div>
	);
}

const MemoizedList = memo(QueryList);
export default MemoizedList;
