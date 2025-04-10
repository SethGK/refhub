import React, { useState, useEffect } from 'react';
import ReferenceRangeList from '../components/ReferenceRangeList';
import ReferenceRangeForm from '../components/ReferenceRangeForm';
import {
  fetchReferenceRanges,
  createReferenceRange,
  updateReferenceRange,
  deleteReferenceRange,
} from '../utils/api'; // Import API functions

function ReferenceRangesPage() {
  const [ranges, setRanges] = useState([]);
  const [editingRangeId, setEditingRangeId] = useState(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchReferenceRanges(token);
      setRanges(data);
    } catch (error) {
      setMessage(`Failed to fetch reference ranges: ${error.message}`);
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

  const initialFormState = {
    analyte_name: '',
    lower_bound: '',
    upper_bound: '',
    unit: '',
    note: '',
  };

  const rangeToEdit = editingRangeId ? ranges.find((r) => r.id === editingRangeId) : null;

  return (
    <div>
      <h2>Reference Ranges</h2>
      {message && <p>{message}</p>}

      <ReferenceRangeList ranges={ranges} onEdit={handleEdit} onDelete={handleDelete} />

      <ReferenceRangeForm
        onSubmit={editingRangeId ? handleUpdate : handleCreate}
        initialValues={rangeToEdit || initialFormState}
        onCancel={handleCancelEdit}
        editing={editingRangeId !== null}
      />
    </div>
  );
}

export default ReferenceRangesPage;