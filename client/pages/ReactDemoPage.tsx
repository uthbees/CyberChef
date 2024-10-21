import { useState } from 'react';

export default function ReactDemoPage() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </div>
    );
}
