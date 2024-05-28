import Content from "./Content";
import Sidebar from "./Sidebar";
import './Dashboard.scss';
import { useQueryManager } from "../hooks/useQueryManager";

export default function Dashboard() {
    const {queryList, activeQueryId, setActiveQueryId} = useQueryManager();

    return (
        <div className="dashboard">
            <Sidebar
                queries={queryList}
                selectedQueryId={activeQueryId}
                onQuerySelect={(queryId) => setActiveQueryId(queryId)}/>
            <Content selectedQueryId={activeQueryId}/>
        </div>
    )
}