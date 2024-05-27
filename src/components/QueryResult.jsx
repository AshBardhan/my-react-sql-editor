export default function QueryResult() {
    return (
        <div style={{flexGrow: '1'}}>
            <div style={{display: 'flex', gap: '20px', flexDirection: 'column', height: '100%'}}>
                <div style={{padding: '20px', border: '1px solid', flexShrink: '0'}}>
                    <h3>Result Filter</h3>
                </div>
                <div style={{padding: '20px', border: '1px solid', flexGrow: '1'}}>
                    <h3>Results Table</h3>
                </div>
            </div>
        </div>
    )
}