import React, { useState } from 'react';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState([]);

  const fetch = async () => {
    try {
      const response = inputData &&  await fetch(inputData);
      const data = await response.json();
      setResult(
        data.reduce((acc, item) => {
          return [...new Set([...acc, ...item.numbers])].sort((a, b) => a - b);
        }, [])
      );
    } catch (error) {
      console.error('Error fetching numbers:', error);
      setResult([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter the disered URL"
      />
      <button onClick={fetch}>Get Numbers</button>
      {result.length > 0 && (
        <div>
          <h3>Result Numbers:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;