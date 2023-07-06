import './App.css';
import { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect executed');

    // Cleanup function
    return () => {
      console.log('Cleanup function executed');
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Header Area</h1>
      </header>

      <ExampleComponent />

    </div>
  );
}

export default App;
