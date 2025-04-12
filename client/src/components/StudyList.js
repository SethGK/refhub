import React from 'react';

function StudyList({ studies, onEdit, onDelete, allReferenceRanges }) {
  // Helper to get reference range names from the study object.
  // If the study includes a full array in "reference_ranges", use it.
  const getReferenceRangeNames = (study) => {
    if (study.reference_ranges && study.reference_ranges.length > 0) {
      return study.reference_ranges.map(rr => rr.analyte_name).join(', ');
    }
    // Fallback: if only IDs are available (unlikely if backend preloads), try mapping them.
    if (study.reference_range_ids && allReferenceRanges) {
      const names = study.reference_range_ids.map(id => {
        const rr = allReferenceRanges.find(r => r.id === id);
        return rr ? rr.analyte_name : null;
      }).filter(name => name);
      return names.join(', ');
    }
    return 'None';
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Study List</h3>
      {studies.length === 0 ? (
        <p>No studies found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Publication Date</th>
              <th className="px-4 py-2 border">Reference Ranges</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr key={study.id}>
                <td className="px-4 py-2 border">{study.name}</td>
                <td className="px-4 py-2 border">{study.description}</td>
                <td className="px-4 py-2 border">{formatDate(study.publication_date)}</td>
                <td className="px-4 py-2 border">{getReferenceRangeNames(study)}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onEdit(study.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(study.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
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
