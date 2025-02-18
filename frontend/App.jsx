import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/analyze')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">PRレビュー分析</h1>
      <BarChart width={600} height={300} data={Object.entries(data).map(([name, value]) => ({ name, value }))}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
