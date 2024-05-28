import Content from "./Content";
import Sidebar from "./Sidebar";
import './Dashboard.scss';

export default function Dashboard({queryList, selectedQuery, onQuerySelect}) {
    return (
        <div className="dashboard">
            <Sidebar queryList={queryList} selectedQuery={selectedQuery} onQuerySelect={onQuerySelect} />
            <Content selectedQuery={selectedQuery}/>
        </div>
       
    )
}