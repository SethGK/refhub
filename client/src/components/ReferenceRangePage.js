import React, { useState, useEffect } from 'react';

function ReferenceRangePage({ token }) {
  const [ranges, setRanges] = useState([]);
  const [newRange, setNewRange] = useState({
    analyte_name: '',
    lower_bound: '',
    upper_bound: '',
    unit: '',
    note: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReferenceRanges();
  }, [token]); // Fetch on token change (login)

  const fetchReferenceRanges = async () => {
    try {
      const response = await fetch('http://localhost:8080/reference_ranges', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRanges(data);
      } else {
        setMessage('Failed to fetch reference ranges.');
      }
    } catch (error) {
      setMessage(`Failed to fetch reference ranges: ${error.message}`);
    }
  };

  const createReferenceRange = async () => {
    try {
      const response = await fetch('http://localhost:8080/reference_ranges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newRange,
          lower_bound: parseFloat(newRange.lower_bound),
          upper_bound: parseFloat(newRange.upper_bound), 
        }),
      });
      if (response.ok) {
        setMessage('Reference range created successfully!');
        fetchReferenceRanges();
        setNewRange({ analyte_name: '', lower_bound: '', upper_bound: '', unit: '', note: '' });
      } else {
        const data = await response.json();
        setMessage(`Failed to create reference range: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to create reference range: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Reference Ranges</h2>
      {message && <p>{message}</p>}
      <ul>
        {ranges.map((range) => (
          <li key={range.id}>
            {range.analyte_name}: {range.lower_bound} - {range.upper_bound} {range.unit} ({range.note})
          </li>
        ))}
      </ul>

      <h3>Create New Reference Range</h3>
      <input
        placeholder="Analyte Name"
        value={newRange.analyte_name}
        onChange={(e) => setNewRange({ ...newRange, analyte_name: e.target.value })}
      />
      <input
        placeholder="Lower Bound"
        value={newRange.lower_bound}
        onChange={(e) => setNewRange({ ...newRange, lower_bound: e.target.value })}
      />
      <input
        placeholder="Upper Bound"
        value={newRange.upper_bound}
        onChange={(e) => setNewRange({ ...newRange, upper_bound: e.target.value })}
      />
      <input
        placeholder="Unit"
        value={newRange.unit}
        onChange={(e) => setNewRange({ ...newRange, unit: e.target.value })}
      />
      <input
        placeholder="Note"
        value={newRange.note}
        onChange={(e) => setNewRange({ ...newRange, note: e.target.value })}
      />
      <button onClick={createReferenceRange}>Create Range</button>
    </div>
  );
}

export default ReferenceRangePage;