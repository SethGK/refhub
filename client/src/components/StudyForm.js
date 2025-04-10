import React, { useState, useEffect } from 'react';

function StudyForm({ onSubmit, initialValues, onCancel, editing }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation (basic)
    if (!formData.name || !formData.description || !formData.publication_date) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div>
      <h3>{editing ? 'Edit Study' : 'Create New Study'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name || ''} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description || ''} onChange={handleChange} required />

        <label>Publication Date:</label>
        <input 
          type="date" 
          name="publication_date" 
          value={formData.publication_date || ''} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
}

export default StudyForm;