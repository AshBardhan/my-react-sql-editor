import QueryContent from './QueryContent';
import QueryList from './QueryList';
import {useQueryManager} from '../hooks/useQueryManager';
import {useState} from 'react';
import './Dashboard.scss';

export default function Dashboard() {
	const {getAllQueries, createQuery, getQueryById, getQueryResultById, fetchQueryResult, updateQuery, deleteQuery, isResultLoading} = useQueryManager();
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
			<QueryContent
				queryId={activeQueryId}
				query={getQueryById(activeQueryId)}
				queryResult={getQueryResultById(activeQueryId)}
				fetchQueryResult={fetchQueryResult}
				updateQuery={updateQuery}
				deleteQuery={deleteQuery}
				isResultLoading={isResultLoading}
			/>
		</div>
	);
}
