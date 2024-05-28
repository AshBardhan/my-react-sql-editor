import './Sidebar.scss';

export default function Sidebar({queries, selectedQueryId, onQuerySelect}) {
    return (
        <div className='sidebar'>
            <div className='query-search'>
                <h3>Queries</h3>
                <input type="text" className="input-text" name="query-search" placeholder='Search Query' />
            </div>
            <ul className='query-list'>
                {queries.map((queryItem, queryId) => (
                    <li key={queryId}
                        className={queryId === selectedQueryId ? 'selected' : ''}
                        onClick={() => onQuerySelect(queryId)}>
                        {queryItem.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}