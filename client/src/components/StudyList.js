import React from 'react';

function StudyList({ studies, onEdit, onDelete }) {
  return (
    <div>
      <h3>Study List</h3>
      {studies.length === 0 ? (
        <p>No studies found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Publication Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr key={study.id}>
                <td>{study.name}</td>
                <td>{study.description}</td>
                <td>{study.publication_date}</td>
                <td>
                  <button onClick={() => onEdit(study.id)}>Edit</button>
                  <button onClick={() => onDelete(study.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudyList;