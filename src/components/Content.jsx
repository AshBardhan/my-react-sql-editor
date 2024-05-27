import QueryBox from "./QueryBox";
import QueryResult from "./QueryResult";
import './Content.scss';

export default function Content() {
    return (
        <div className="content">
            <QueryBox/>
            <QueryResult/>
        </div>
    )
}