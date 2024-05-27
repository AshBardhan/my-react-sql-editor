import './Sidebar.scss';

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='query-search'>
                <h3>Queries</h3>
                <input type="text" className="input-text" name="query-search" placeholder='Search Query' />
            </div>
            <ul className='query-list'>
                {[...Array(5)].map((u, i) => (
                    <li>Query List</li>
                ))}
            </ul>
        </div>
    )
}