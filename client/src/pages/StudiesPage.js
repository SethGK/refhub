import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudyList from '../components/StudyList';
import StudyForm from '../components/StudyForm';
import {
  fetchStudies,
  createStudy,
  updateStudy,
  deleteStudy,
} from '../utils/api';

function StudiesPage({ token }) {
  const [studies, setStudies] = useState([]);
  const [editingStudyId, setEditingStudyId] = useState(null);
  const [message, setMessage] = useState('');
  // const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate();

  useEffect(() => {
    console.log('StudiesPage.js - Token (useEffect):', token, typeof token, token === null, token === undefined, token === '');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetchStudies(token);
      console.log('fetchStudies Response (Raw):', response);
      setStudies(response);
    } catch (error) {
      console.error('Fetch Studies Error:', error);
      console.error('Error Stack:', error.stack);
      setMessage(`Failed to fetch studies: ${error.message}`);
    }
  };

  const handleCreate = async (newStudyData) => {
    console.log('StudiesPage.js - Token (handleCreate):', token, typeof token, token === null, token === undefined, token === '');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await createStudy(token, newStudyData);
      setMessage('Study created successfully!');
      fetchData();
    } catch (error) {
      console.error('Create Study Error:', error);
      console.error('Error Stack:', error.stack);
      setMessage(`Failed to create study: ${error.message}`);
    }
  };

  const handleUpdate = async (id, updatedStudyData) => {
    console.log('StudiesPage.js - Token (handleUpdate):', token, typeof token, token === null, token === undefined, token === '');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await updateStudy(token, id, updatedStudyData);
      setMessage('Study updated successfully!');
      fetchData();
      setEditingStudyId(null);
    } catch (error) {
      console.error('Update Study Error:', error);
      console.error('Error Stack:', error.stack);
      setMessage(`Failed to update study: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    console.log('StudiesPage.js - Token (handleDelete):', token, typeof token, token === null, token === undefined, token === '');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await deleteStudy(token, id);
      setMessage('Study deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Delete Study Error:', error);
      console.error('Error Stack:', error.stack);
      setMessage(`Failed to delete study: ${error.message}`);
    }
  };

  const handleEdit = (id) => {
    setEditingStudyId(id);
  };

  const handleCancelEdit = () => {
    setEditingStudyId(null);
  };

  const initialFormState = {
    name: '',
    description: '',
    publication_date: '',
  };

  const studyToEdit = editingStudyId ? studies.find((s) => s.id === editingStudyId) : null;

  return (
    <div>
      <h2>Studies</h2>
      {message && <p>{message}</p>}

      <StudyList studies={studies} onEdit={handleEdit} onDelete={handleDelete} />

      <StudyForm
        onSubmit={editingStudyId ? (data) => handleUpdate(editingStudyId, data) : handleCreate}
        initialValues={studyToEdit || initialFormState}
        onCancel={handleCancelEdit}
        editing={editingStudyId !== null}
      />
    </div>
  );
}

export default StudiesPage;