import { useState } from "react";
import { initialQueryData } from "../shared/QueryData";
import { QueryService } from "../services/queryService";
import { csvToJson } from "../utils/csvToJson";

export function useQueryManager() {
    const [queryList, setQueryList] = useState(initialQueryData);
    const [resultList, setResultList] = useState([]);
    const [isResultLoading, setIsResultLoading] = useState(false);
    const [activeQueryId, setActiveQueryId] = useState(null);

    function getQueryResultById(id) {
        if (resultList[id]) {
          return resultList[id];
        }
        return null;
      }

    function getIndexOfQuery(query) {
        return queryList.indexOf(query);
    }

    async function fetchQueryResult(query) {
        setIsResultLoading(true);
        const csvStr = await QueryService();
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

    function getQueryById(id) {
        if (queryList[id]) {
          return queryList[id];
        }
        return null;
    }

    function getAllQueries() {
      return queryList;
    }

    return {
        getAllQueries,
        setQueryList,
        getQueryById,
        activeQueryId,
        setActiveQueryId,
        updateQuery,
        getQueryResultById,
        fetchQueryResult,
        isResultLoading
    };
}