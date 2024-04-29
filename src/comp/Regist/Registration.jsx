import React, { useState } from 'react';
import './RegistrationForm.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const Reg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    college: '',
    yearOfStudy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="registration-form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="college">College:</label>
          <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="yearOfStudy">Year of Study:</label>
          <input type="text" id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required />
        </div>
        <button type="submit" onClick={() => navigate('/RandomEvent')}>Submit</button>
      </form>
    </div>
  );
};

export default Reg;
