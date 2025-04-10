import React from 'react';

function ReferenceRangeList({ ranges, onEdit, onDelete }) {
  return (
    <div>
      <h3>Reference Ranges List</h3>
      {ranges.length === 0 ? (
        <p>No reference ranges found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Analyte</th>
              <th>Lower Bound</th>
              <th>Upper Bound</th>
              <th>Unit</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ranges.map((range) => (
              <tr key={range.id}>
                <td>{range.analyte_name}</td>
                <td>{range.lower_bound}</td>
                <td>{range.upper_bound}</td>
                <td>{range.unit}</td>
                <td>{range.note}</td>
                <td>
                  <button onClick={() => onEdit(range.id)}>Edit</button>
                  <button onClick={() => onDelete(range.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReferenceRangeList;