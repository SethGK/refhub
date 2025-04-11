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

  // Filter reference ranges by selected department (if any)
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
  };

  const rangeToEdit = editingRangeId ? ranges.find((r) => r.id === editingRangeId) : null;

  return (
    <div>
      <h2>Reference Ranges</h2>
      {message && <p>{message}</p>}

      {/* Department Menu */}
      <div>
        <h3>Departments</h3>
        <select
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
        />
        <button onClick={handleAddDepartment}>Add Department</button>
      </div>

      {/* Department List with Delete Option */}
      <div>
        <h4>Manage Departments</h4>
        <ul>
          {departments.map((dept) => (
            <li key={dept.id}>
              {dept.name}
              <button
                onClick={() => handleDeleteDepartment(dept.id, dept.name)}
                style={{ marginLeft: '8px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* List of reference ranges (filtered by department if selected) */}
      <ReferenceRangeList
        ranges={filteredRanges}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Reference Range Form with departments passed in */}
      <ReferenceRangeForm
        onSubmit={editingRangeId ? handleUpdate : handleCreate}
        initialValues={rangeToEdit || initialFormState}
        onCancel={handleCancelEdit}
        editing={editingRangeId !== null}
        departments={departments.map(dept => dept.name)}
      />
    </div>
  );
}

export default ReferenceRangesPage;
