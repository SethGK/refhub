import React, { useState, useEffect } from 'react';

function ReferenceRangeForm({ onSubmit, initialValues, onCancel, editing, departments }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For number fields like min_age and max_age, convert to number (or empty string)
    if ((name === 'min_age' || name === 'max_age') && type === 'number') {
      setFormData({ 
        ...formData, 
        [name]: value === '' ? '' : Number(value) 
      });
    } else if (name === 'pregnancy') {
      // For pregnancy, treat as a string (will convert later)
      setFormData({ ...formData, [name]: value });
    } else {
      // For lower_bound and upper_bound and all other fields, keep as string
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (
      !formData.analyte_name ||
      formData.lower_bound === '' ||
      formData.upper_bound === '' ||
      !formData.unit ||
      !formData.department ||
      formData.sex === undefined
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Convert pregnancy field to boolean or null:
    let pregnancyValue = null;
    if (formData.pregnancy === 'true') {
      pregnancyValue = true;
    } else if (formData.pregnancy === 'false') {
      pregnancyValue = false;
    }
    
    const dataToSubmit = {
      ...formData,
      // lower_bound and upper_bound remain as strings
      min_age: formData.min_age === '' ? null : Number(formData.min_age),
      max_age: formData.max_age === '' ? null : Number(formData.max_age),
      pregnancy: pregnancyValue,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editing ? 'Edit Reference Range' : 'Create New Reference Range'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row: Analyte Name, Unit, Lower Bound, Upper Bound */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Analyte Name:</label>
            <input
              name="analyte_name"
              value={formData.analyte_name || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Unit:</label>
            <input
              name="unit"
              value={formData.unit || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Lower Bound:</label>
            <input
              type="text"  // Changed to text for operators like "<" or ">"
              name="lower_bound"
              value={formData.lower_bound || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Upper Bound:</label>
            <input
              type="text" // Changed to text for operators like "<" or ">"
              name="upper_bound"
              value={formData.upper_bound || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Second Row: Department, Sex, Pregnancy */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Department:</label>
            <select
              name="department"
              value={formData.department || ''}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Sex:</label>
            <select
              name="sex"
              value={formData.sex || 'both'}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="both">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pregnancy:</label>
            <select
              name="pregnancy"
              value={formData.pregnancy || ''}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Not Applicable</option>
              <option value="true">Pregnant</option>
              <option value="false">Not Pregnant</option>
            </select>
          </div>
        </div>

        {/* Third Row: Note, Min Age, Max Age */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Note:</label>
            <textarea
              name="note"
              value={formData.note || ''}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Min Age:</label>
            <input
              type="number"
              name="min_age"
              value={formData.min_age || ''}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <label className="block text-gray-700 font-medium mt-2">Max Age:</label>
            <input
              type="number"
              name="max_age"
              value={formData.max_age || ''}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {editing ? 'Update' : 'Create'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReferenceRangeForm;
