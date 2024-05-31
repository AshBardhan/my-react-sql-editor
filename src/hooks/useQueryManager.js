import {useState} from 'react';
import {initialQueryData} from '../shared/QueryData';
import {QueryService} from '../services/queryService';
import {csvToJson} from '../utils/csvToJson';

export function useQueryManager() {
	const [queryList, setQueryList] = useState(initialQueryData);
	const [resultList, setResultList] = useState([]);
	const [isResultLoading, setIsResultLoading] = useState(false);
	const [activeQueryId, setActiveQueryId] = useState(null);

	function getQueryResultById(id) {
		return resultList[id] || null;
	}

	function getIndexOfQuery(query) {
		return queryList.indexOf(query);
	}

	function createQuery() {
		const newList = queryList.concat({
			name: `New Query ${queryList.length + 1}`,
			code: 'SELECT * FROM <table_name> [WHERE <statement>];',
		});

		setQueryList(newList);
		return newList.length - 1;
	}

	async function fetchQueryResult(query, queryId) {
		setIsResultLoading(true);
		const csvStr = await QueryService(queryId);
		const {headers, data} = await csvToJson(csvStr);
		const newResultList = [...resultList];
		newResultList[getIndexOfQuery(query)] = {headers, data};
		setResultList(newResultList);
		setIsResultLoading(false);
	}

	function updateQuery(query, queryId) {
		const newQueryList = [...queryList];
		newQueryList[queryId] = query;
		setQueryList(newQueryList);
	}

	function deleteQuery(queryId) {
		setQueryList(queryList.filter((_query, index) => index !== queryId));
	}

	function getQueryById(id) {
		return queryList[id] || null;
	}

	function getAllQueries() {
		return queryList;
	}

	return {
		getAllQueries,
		setQueryList,
		getQueryById,
		createQuery,
		activeQueryId,
		setActiveQueryId,
		updateQuery,
		deleteQuery,
		getQueryResultById,
		fetchQueryResult,
		isResultLoading,
	};
}
