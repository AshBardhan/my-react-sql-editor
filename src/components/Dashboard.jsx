import Content from "./Content";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <div style={{height: '100%', display: 'flex', gap: '20px'}}>
            <div style={{flexShrink: '0', width: '300px'}}>
                <Sidebar/>
            </div>
            <div style={{flexGrow: '1'}}>
                <Content/>
            </div>
        </div>
    )
}