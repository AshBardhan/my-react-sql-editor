import QueryContent from './QueryContent';
import QueryList from './QueryList';
import './Dashboard.scss';
import {useQueryManager} from '../hooks/useQueryManager';
import {useState} from 'react';

export default function Dashboard() {
	const {getAllQueries, createQuery} = useQueryManager();
	const [activeQueryId, setActiveQueryId] = useState(null);

	function createAndSelectQuery() {
		let newQueryId = createQuery();
		setActiveQueryId(newQueryId);
	}

	return (
		<div className="dashboard">
			<QueryList
				queries={getAllQueries()}
				selectedQueryId={activeQueryId}
				onCreateQuery={createAndSelectQuery}
				onSearchUpdate={() => setActiveQueryId(null)}
				onQuerySelect={(queryId) => setActiveQueryId(queryId)}
			/>
			<QueryContent queryId={activeQueryId} />
		</div>
	);
}
