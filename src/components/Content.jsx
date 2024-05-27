import QueryBox from "./QueryBox";
import QueryResult from "./QueryResult";

export default function Content() {
    return (
        <div style={{height: '100%', display: 'flex', gap: '20px', flexDirection: 'column'}}>
            <QueryBox/>
            <QueryResult/>
        </div>
    )
}