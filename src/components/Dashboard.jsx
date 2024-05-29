import QueryContent from "./QueryContent";
import QueryList from "./QueryList";
import './Dashboard.scss';
import { useQueryManager } from "../hooks/useQueryManager";
import { useState } from "react";

export default function Dashboard() {
    const {getAllQueries} = useQueryManager();
    const [activeQueryId, setActiveQueryId] = useState(null);

    return (
        <div className="dashboard">
            <QueryList
                queries={getAllQueries()}
                selectedQueryId={activeQueryId}
                onQuerySelect={(queryId) => setActiveQueryId(queryId)}/>
            <QueryContent queryId={activeQueryId}/>
        </div>
    )
}