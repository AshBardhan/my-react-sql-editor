import { useState } from "react";
import { initialQueryData } from "../shared/QueryData";

export function useQueryManager() {
    const [queryList, setQueryList] = useState(initialQueryData);
    const [selectedQuery, setSelectedQuery] = useState(null);

    return {
        queryList,
        setQueryList,
        selectedQuery,
        setSelectedQuery
    };
}