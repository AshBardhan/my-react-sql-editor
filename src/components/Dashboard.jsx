import Content from "./Content";
import Sidebar from "./Sidebar";
import './Dashboard.scss';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar/>
            <Content/>
        </div>
    )
}