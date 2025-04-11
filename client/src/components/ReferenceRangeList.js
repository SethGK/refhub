import React, { useState, useRef } from 'react';

function ReferenceRangeList({ ranges, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState(null); // null, 'asc', or 'desc'
  const [columns, setColumns] = useState([
    { id: 'analyte_name', label: 'Analyte', key: 'analyte_name', sortable: true },
    { id: 'department', label: 'Department', key: 'department' },
    { id: 'lower_bound', label: 'Lower Bound', key: 'lower_bound' },
    { id: 'upper_bound', label: 'Upper Bound', key: 'upper_bound' },
    { id: 'unit', label: 'Unit', key: 'unit' },
    { id: 'sex', label: 'Sex', key: 'sex' },
    { id: 'pregnancy', label: 'Pregnancy', key: 'pregnancy' },
    { id: 'min_age', label: 'Min Age', key: 'min_age' },
    { id: 'max_age', label: 'Max Age', key: 'max_age' },
    { id: 'note', label: 'Note', key: 'note' }
  ]);
  
  // For drag and drop functionality
  const draggedItem = useRef(null);
  const dragOverItem = useRef(null);
  
  // Filter ranges based on search term
  let filteredRanges = ranges.filter(range => 
    range.analyte_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting if sort direction is set
  if (sortDirection) {
    filteredRanges = [...filteredRanges].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.analyte_name.localeCompare(b.analyte_name);
      } else {
        return b.analyte_name.localeCompare(a.analyte_name);
      }
    });
  }

  // Handle drag start
  const handleDragStart = (index) => {
    draggedItem.current = index;
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  // Handle drag end - reorder columns
  const handleDragEnd = () => {
    if (draggedItem.current !== null && dragOverItem.current !== null) {
      const newColumns = [...columns];
      const draggedColumn = newColumns[draggedItem.current];
      
      // Remove the dragged item
      newColumns.splice(draggedItem.current, 1);
      
      // Add it at the new position
      newColumns.splice(dragOverItem.current, 0, draggedColumn);
      
      // Update state
      setColumns(newColumns);
      
      // Reset refs
      draggedItem.current = null;
      dragOverItem.current = null;
    }
  };

  // Toggle sort direction
  const toggleSort = () => {
    if (sortDirection === null) {
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection(null);
    }
  };

  // Helper for pregnancy display
  const renderPregnancyValue = (value) => {
    if (value === true) return 'Pregnant';
    if (value === false) return 'Not Pregnant';
    return 'N/A';
  };

  // Render sort icon based on current sort direction
  const renderSortIcon = () => {
    if (sortDirection === null) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
        </svg>
      );
    } else if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      );
    }
  };

  return (
    <div className="max-w-full mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Reference Ranges List</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by analyte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
      
      <div className="mb-2 text-sm text-gray-600">
        <p>Drag column headers to rearrange. Click on the Analyte column to sort alphabetically.</p>
      </div>
      
      {ranges.length === 0 ? (
        <p className="text-gray-600">No reference ranges found.</p>
      ) : filteredRanges.length === 0 ? (
        <p className="text-gray-600">No matching analytes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {columns.map((column, index) => (
                      <th 
                        key={column.id}
                        scope="col" 
                        className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left ${column.sortable ? 'cursor-pointer' : 'cursor-move'}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onClick={column.sortable ? toggleSort : undefined}
                      >
                        <div className="flex items-center space-x-1">
                          {!column.sortable && (
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z" />
                            </svg>
                          )}
                          <span>{column.label}</span>
                          {column.sortable && (
                            <button className="ml-1 focus:outline-none" onClick={(e) => {
                              e.stopPropagation();
                              toggleSort();
                            }}>
                              {renderSortIcon()}
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRanges.map((range, rowIndex) => (
                    <tr
                      key={range.id}
                      className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {columns.map((column) => (
                        <td key={`${range.id}-${column.id}`} className="px-4 py-3 whitespace-nowrap">
                          {column.key === 'sex' ? (
                            <span className="capitalize">{range[column.key]}</span>
                          ) : column.key === 'pregnancy' ? (
                            renderPregnancyValue(range[column.key])
                          ) : column.key === 'min_age' || column.key === 'max_age' ? (
                            range[column.key] ?? '—'
                          ) : (
                            range[column.key]
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 whitespace-nowrap text-center space-x-2">
                        <button
                          onClick={() => onEdit(range.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(range.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReferenceRangeList;