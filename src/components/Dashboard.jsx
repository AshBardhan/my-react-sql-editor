import Content from "./Content";
import Sidebar from "./Sidebar";
import './Dashboard.scss';
import { useQueryManager } from "../hooks/useQueryManager";

export default function Dashboard() {
    const {queryList, selectedQuery, setSelectedQuery} = useQueryManager();

    return (
        <div className="dashboard">
            <Sidebar
                queryList={queryList}
                selectedQuery={selectedQuery}
                onQuerySelect={(queryItem) => setSelectedQuery(queryItem)} />
            <Content selectedQuery={selectedQuery}/>
        </div>
    )
}