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
        const csvStr = await QueryService(query.input);
        const {headers, data} = await csvToJson(csvStr);
        const newList = [...resultList];
        newList[getIndexOfQuery(query)] = {headers, data};
        setResultList(newList);
        setIsResultLoading(false);
    }

    function getQueryById(id) {
        if (queryList[id]) {
          return queryList[id];
        }
        return null;
    }

    return {
        queryList,
        setQueryList,
        getQueryById,
        activeQueryId,
        setActiveQueryId,
        getQueryResultById,
        fetchQueryResult,
        isResultLoading
    };
}