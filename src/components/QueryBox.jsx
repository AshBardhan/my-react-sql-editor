export default function QueryBox() {
    return (
        <div style={{flexShrink: '0'}}>
            <div style={{display: 'flex', gap: '20px', height: '200px'}}>
                <div style={{padding: '20px', border: '1px solid', flexGrow: '1'}}>
                    <h3>Query Input</h3>
                </div>
                <div style={{padding: '20px', border: '1px solid', flexShrink: '0'}}>
                    <h3>Action Buttons</h3>
                </div>
            </div>
        </div>
    )
}