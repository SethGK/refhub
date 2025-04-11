import React, { useState, useEffect } from 'react';
import ReferenceRangeList from '../components/ReferenceRangeList';
import ReferenceRangeForm from '../components/ReferenceRangeForm';
import {
  fetchReferenceRanges,
  createReferenceRange,
  updateReferenceRange,
  deleteReferenceRange,
  fetchDepartments,
  createDepartment,
  deleteDepartment,
} from '../utils/api';

function ReferenceRangesPage() {
  const [ranges, setRanges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingRangeId, setEditingRangeId] = useState(null);
  const [message, setMessage] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    fetchData();
    fetchDepartmentData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchReferenceRanges(token);
      setRanges(data);
    } catch (error) {
      setMessage(`Failed to fetch reference ranges: ${error.message}`);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const data = await fetchDepartments(token);
      setDepartments(data);
    } catch (error) {
      setMessage(`Failed to fetch departments: ${error.message}`);
    }
  };

  const handleCreate = async (newRangeData) => {
    try {
      await createReferenceRange(token, newRangeData);
      setMessage('Reference range created successfully!');
      fetchData();
    } catch (error) {
      setMessage(`Failed to create reference range: ${error.message}`);
    }
  };

  const handleUpdate = async (id, updatedRangeData) => {
    try {
      await updateReferenceRange(token, id, updatedRangeData);
      setMessage('Reference range updated successfully!');
      fetchData();
      setEditingRangeId(null);
    } catch (error) {
      setMessage(`Failed to update reference range: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReferenceRange(token, id);
      setMessage('Reference range deleted successfully!');
      fetchData();
    } catch (error) {
      setMessage(`Failed to delete reference range: ${error.message}`);
    }
  };

  const handleEdit = (id) => {
    setEditingRangeId(id);
  };

  const handleCancelEdit = () => {
    setEditingRangeId(null);
  };

  const handleAddDepartment = async () => {
    const dept = newDepartment.trim();
    if (dept !== '' && !departments.find(d => d.name === dept)) {
      try {
        await createDepartment(token, { name: dept });
        setMessage(`Department "${dept}" added successfully!`);
        fetchDepartmentData();
        setNewDepartment('');
      } catch (error) {
        setMessage(`Failed to add department: ${error.message}`);
      }
    }
  };

  const handleDeleteDepartment = async (deptId, deptName) => {
    if (!window.confirm(`Are you sure you want to delete the "${deptName}" department? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteDepartment(token, deptId);
      setMessage(`Department "${deptName}" deleted successfully!`);
      fetchDepartmentData();
      if (selectedDepartment === deptName) {
        setSelectedDepartment('');
      }
    } catch (error) {
      setMessage(`Failed to delete department: ${error.message}`);
    }
  };

  const filteredRanges = selectedDepartment
    ? ranges.filter(range => range.department === selectedDepartment)
    : ranges;

  const initialFormState = {
    analyte_name: '',
    lower_bound: '',
    upper_bound: '',
    unit: '',
    note: '',
    department: '',
    min_age: '',
    max_age: '',
    sex: 'both',
    pregnancy: '',
  };

  const rangeToEdit = editingRangeId ? ranges.find((r) => r.id === editingRangeId) : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reference Ranges</h2>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-800">
          {message}
        </div>
      )}

      {/* Department Filter */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Sort by Department</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Add new department"
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
          />
          <button
            onClick={handleAddDepartment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Department
          </button>
        </div>
      </div>

      {/* Department List Management */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h4 className="text-md font-medium mb-2 text-gray-700">Manage Departments</h4>
        <ul className="space-y-2">
          {departments.map((dept) => (
            <li key={dept.id} className="flex justify-between items-center border-b pb-1">
              <span>{dept.name}</span>
              <button
                onClick={() => handleDeleteDepartment(dept.id, dept.name)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reference Ranges List */}
      <ReferenceRangeList
        ranges={filteredRanges}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Reference Range Form */}
      <div className="mt-10">
        <ReferenceRangeForm
          onSubmit={editingRangeId ? handleUpdate : handleCreate}
          initialValues={rangeToEdit || initialFormState}
          onCancel={handleCancelEdit}
          editing={editingRangeId !== null}
          departments={departments.map(dept => dept.name)}
        />
      </div>
    </div>
  );
}

export default ReferenceRangesPage;
