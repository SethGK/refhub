import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudyList from '../components/StudyList';
import StudyForm from '../components/StudyForm';
import {
  fetchStudies,
  createStudy,
  updateStudy,
  deleteStudy,
  fetchReferenceRanges,
} from '../utils/api';

function StudiesPage({ token }) {
  const [studies, setStudies] = useState([]);
  const [editingStudyId, setEditingStudyId] = useState(null);
  const [message, setMessage] = useState('');
  const [referenceRanges, setReferenceRanges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
    fetchReferenceRangesData();
  }, [token, navigate]);

  const fetchData = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetchStudies(token);
      setStudies(response);
    } catch (error) {
      setMessage(`Failed to fetch studies: ${error.message}`);
    }
  };

  const fetchReferenceRangesData = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetchReferenceRanges(token);
      setReferenceRanges(response);
    } catch (error) {
      setMessage(`Failed to fetch reference ranges: ${error.message}`);
    }
  };

  const handleCreate = async (newStudyData) => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await createStudy(token, newStudyData);
      setMessage('Study created successfully!');
      fetchData();
    } catch (error) {
      setMessage(`Failed to create study: ${error.message}`);
    }
  };

  const handleUpdate = async (id, updatedStudyData) => {
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
      setMessage(`Failed to update study: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await deleteStudy(token, id);
      setMessage('Study deleted successfully!');
      fetchData();
    } catch (error) {
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
    referenceRanges: []
  };

  const studyToEdit = editingStudyId
    ? studies.find((s) => s.id === editingStudyId)
    : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Studies</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <StudyList
        studies={studies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        allReferenceRanges={referenceRanges}
      />

      <div className="mt-10">
        <StudyForm
          onSubmit={editingStudyId ? (data) => handleUpdate(editingStudyId, data) : handleCreate}
          initialValues={studyToEdit || initialFormState}
          onCancel={handleCancelEdit}
          editing={editingStudyId !== null}
          referenceRanges={referenceRanges}
        />
      </div>
    </div>
  );
}

export default StudiesPage;
