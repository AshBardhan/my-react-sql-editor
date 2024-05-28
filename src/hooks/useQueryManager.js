import { useState } from "react";
import { initialQueryData } from "../shared/QueryData";
import { QueryService } from "../services/queryService";
import { csvToJson } from "../utils/csvToJson";

export function useQueryManager() {
    const [queryList, setQueryList] = useState(initialQueryData);
    const [resultList, setResultList] = useState([]);
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
        const csvStr = await QueryService(query.input);
        const {headers, data} = await csvToJson(csvStr);
        const newList = [...resultList];
        newList[getIndexOfQuery(query)] = {headers, data};
        setResultList(newList);
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
        getQueryResultById,
        fetchQueryResult,
        setActiveQueryId
    };
}