export default function Sidebar() {
    return (
        <div style={{height: '100%'}}>
            <div style={{display: 'flex', gap: '20px', flexDirection: 'column', height: '100%'}}>
                <div style={{padding: '20px', border: '1px solid', flexShrink: '0'}}>
                    <h3>Query Search</h3>
                </div>
                <div style={{padding: '20px', border: '1px solid', flexGrow: '1'}}>
                    <h3>Query List</h3>
                </div>
            </div>
        </div>
    )
}