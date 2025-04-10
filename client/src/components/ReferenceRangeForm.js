import React, { useState, useEffect } from 'react';

function ReferenceRangeForm({ onSubmit, initialValues, onCancel, editing }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convert numeric inputs to numbers before storing in state
    if (type === 'number') {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation (basic)
    if (!formData.analyte_name || 
        formData.lower_bound === '' || 
        formData.upper_bound === '' || 
        !formData.unit) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Make sure numeric fields are converted to numbers before submission
    const dataToSubmit = {
      ...formData,
      lower_bound: Number(formData.lower_bound),
      upper_bound: Number(formData.upper_bound)
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <div>
      <h3>{editing ? 'Edit Reference Range' : 'Create New Reference Range'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Analyte Name:</label>
        <input 
          name="analyte_name" 
          value={formData.analyte_name || ''} 
          onChange={handleChange} 
          required 
        />

        <label>Lower Bound:</label>
        <input 
          type="number" 
          name="lower_bound" 
          value={formData.lower_bound || ''} 
          onChange={handleChange} 
          step="any" 
          required 
        />

        <label>Upper Bound:</label>
        <input 
          type="number" 
          name="upper_bound" 
          value={formData.upper_bound || ''} 
          onChange={handleChange} 
          step="any" 
          required 
        />

        <label>Unit:</label>
        <input 
          name="unit" 
          value={formData.unit || ''} 
          onChange={handleChange} 
          required 
        />

        <label>Note:</label>
        <textarea 
          name="note" 
          value={formData.note || ''} 
          onChange={handleChange} 
        />

        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
}

export default ReferenceRangeForm;