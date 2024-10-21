import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: 67,
    ca: 3,
    chol: 286,
    cp: 4,
    exang: 1,
    fbs: 0,
    oldpeak: 1.5,
    restecg: 2,
    sex: 1,
    slope: 2,
    thal: 3,
    thalach: 108,
    trestbps: 160
  });

  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert form data to the correct types
    const formattedData = {
      ...formData,
      age: parseInt(formData.age, 10),
      ca: parseInt(formData.ca, 10),
      chol: parseInt(formData.chol, 10),
      cp: parseInt(formData.cp, 10),
      exang: parseInt(formData.exang, 10),
      fbs: parseInt(formData.fbs, 10),
      oldpeak: parseFloat(formData.oldpeak),
      restecg: parseInt(formData.restecg, 10),
      sex: parseInt(formData.sex, 10),
      slope: parseInt(formData.slope, 10),
      thal: parseInt(formData.thal, 10),
      thalach: parseInt(formData.thalach, 10),
      trestbps: parseInt(formData.trestbps, 10)
    };

    try {
      const response = await fetch('http://localhost:8800/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ features: formattedData }) // Wrap formData in a features key
      });
      if (response.ok) {
        const data = await response.json();
        setApiResponse(data);
      } else {
        const errorData = await response.json();
        console.error('Error submitting data:', errorData);
        alert(`Error submitting data: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>Fill in the Details</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="number"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              step={key === 'oldpeak' ? '0.1' : '1'}
            />
          </div>
        ))}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      {apiResponse && (
        <div className="api-response">
          <h3>Prediction Result</h3>
          <p><strong>Integer Output:</strong> {apiResponse.int_output ? 'Yes' : 'No'}</p>
          <p><strong>String Output:</strong> {apiResponse.str_output}</p>
        </div>
      )}
    </div>
  );
}

export default App;