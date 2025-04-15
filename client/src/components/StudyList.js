import React, { useState } from 'react';

function StudyList({ studies, onEdit, onDelete, allReferenceRanges }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('reference_ranges');
  const [sortOrder, setSortOrder] = useState('asc');

  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  const getReferenceRangeNames = (study) => {
    if (study.reference_ranges && study.reference_ranges.length > 0) {
      return study.reference_ranges.map(rr => rr.analyte_name).join(', ');
    }
    if (study.reference_range_ids && allReferenceRanges) {
      const names = study.reference_range_ids
        .map(id => {
          const rr = allReferenceRanges.find(r => r.id === id);
          return rr ? rr.analyte_name : null;
        })
        .filter(name => name);
      return names.join(', ');
    }
    return 'None';
  };

  
  const compareStudies = (a, b) => {
    let aVal, bVal;
    switch (sortColumn) {
      case 'name':
        aVal = a.name?.toLowerCase() || '';
        bVal = b.name?.toLowerCase() || '';
        break;
      case 'description':
        aVal = a.description?.toLowerCase() || '';
        bVal = b.description?.toLowerCase() || '';
        break;
      case 'publication_date':
        aVal = new Date(a.publication_date).getTime() || 0;
        bVal = new Date(b.publication_date).getTime() || 0;
        break;
      case 'reference_ranges':
        aVal = getReferenceRangeNames(a).toLowerCase();
        bVal = getReferenceRangeNames(b).toLowerCase();
        break;
      default:
        aVal = '';
        bVal = '';
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  };

  
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const renderSortIndicator = (column) => {
    if (sortColumn !== column) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };


  const filteredStudies = studies.filter((study) => {
    const lowerQuery = searchQuery.toLowerCase();
    const name = study.name?.toLowerCase() || '';
    const description = study.description?.toLowerCase() || '';
    const refRangeNames = getReferenceRangeNames(study).toLowerCase();
    const publicationDate = formatDate(study.publication_date).toLowerCase();

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      refRangeNames.includes(lowerQuery) ||
      publicationDate.includes(lowerQuery)
    );
  });

  
  const sortedStudies = [...filteredStudies].sort(compareStudies);

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Study List</h3>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search studies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {sortedStudies.length === 0 ? (
        <p>No studies found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="cursor-pointer px-4 py-2 border"
              >
                Name{renderSortIndicator('name')}
              </th>
              <th
                onClick={() => handleSort('description')}
                className="cursor-pointer px-4 py-2 border"
              >
                Description{renderSortIndicator('description')}
              </th>
              <th
                onClick={() => handleSort('publication_date')}
                className="cursor-pointer px-4 py-2 border"
              >
                Publication Date{renderSortIndicator('publication_date')}
              </th>
              <th
                onClick={() => handleSort('reference_ranges')}
                className="cursor-pointer px-4 py-2 border"
              >
                Reference Ranges{renderSortIndicator('reference_ranges')}
              </th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudies.map((study) => (
              <tr key={study.id}>
                <td className="px-4 py-2 border">
                  {study.link ? (
                    <a 
                      href={study.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      {study.name}
                    </a>
                  ) : (
                    study.name
                  )}
                </td>
                <td className="px-4 py-2 border">{study.description}</td>
                <td className="px-4 py-2 border">
                  {formatDate(study.publication_date)}
                </td>
                <td className="px-4 py-2 border">
                  {getReferenceRangeNames(study)}
                </td>
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
