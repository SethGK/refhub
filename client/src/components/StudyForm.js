import React, { useState, useEffect } from 'react';

function StudyForm({ onSubmit, initialValues, onCancel, editing, referenceRanges }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    // When editing, transform the reference_ranges array (if present) to just IDs
    if (initialValues && initialValues.reference_ranges) {
      const rangeIds = initialValues.reference_ranges.map(range => range.id);
      setFormData({
        ...initialValues,
        referenceRanges: rangeIds  // local state uses camelCase for the selected IDs
      });
    } else {
      setFormData(initialValues);
    }
  }, [initialValues]);

  // Standard input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for the multi-select input for reference ranges
  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(Number(options[i].value));
      }
    }
    setFormData({ ...formData, referenceRanges: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation: ensure required fields are set
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
    // Transform the selected IDs (stored in formData.referenceRanges) into an array of objects,
    // as expected by the backend in the "reference_ranges" field.
    const payload = {
      ...formData,
      reference_ranges: (formData.referenceRanges || []).map(id => ({ id }))
    };
    // Remove the temporary property that is only used for the multi-select
    delete payload.referenceRanges;
    onSubmit(payload);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">
        {editing ? 'Edit Study' : 'Create New Study'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Publication Date:</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="date"
            name="publication_date"
            value={formData.publication_date || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Reference Ranges:</label>
          <select
            className="w-full border rounded px-3 py-2"
            name="referenceRanges"
            multiple
            value={formData.referenceRanges || []}
            onChange={handleMultiSelectChange}
          >
            {referenceRanges.map((rr) => (
              <option key={rr.id} value={rr.id}>
                {rr.analyte_name} ({rr.unit})
              </option>
            ))}
          </select>
          <small className="text-gray-500">
            Hold down Ctrl (Windows) or Command (Mac) to select multiple options.
          </small>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editing ? 'Update' : 'Create'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudyForm;
