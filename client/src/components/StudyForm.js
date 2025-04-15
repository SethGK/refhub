import React, { useState, useEffect } from 'react';

function StudyForm({ onSubmit, initialValues, onCancel, editing, referenceRanges }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (initialValues && initialValues.reference_ranges) {
      const rangeIds = initialValues.reference_ranges.map(range => range.id);
      setFormData({
        ...initialValues,
        referenceRanges: rangeIds
      });
    } else {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
    const payload = {
      ...formData,
      reference_ranges: (formData.referenceRanges || []).map(id => ({ id }))
    };
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
        {/* New field for study link */}
        <div>
          <label className="block text-gray-700">Study Link:</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="url"
            name="link"
            placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
            value={formData.link || ''}
            onChange={handleChange}
          />
          <small className="text-gray-500">
            Enter a URL to the study (e.g., a PubMed link).
          </small>
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
