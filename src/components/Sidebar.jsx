import './Sidebar.scss';

export default function Sidebar({queryList, selectedQuery, onQuerySelect}) {
    return (
        <div className='sidebar'>
            <div className='query-search'>
                <h3>Queries</h3>
                <input type="text" className="input-text" name="query-search" placeholder='Search Query' />
            </div>
            <ul className='query-list'>
                {queryList.map((queryItem, queryIndex) => (
                    <li key={queryIndex}
                        className={queryItem === selectedQuery ? 'selected' : ''}
                        onClick={() => onQuerySelect(queryItem)}>
                        {queryItem.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}