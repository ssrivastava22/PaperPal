import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';
import whiteStar from "../../assets/img/whiteStar"

const Newtab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    expertise: '',
    interest: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your backend submission logic here
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tell me about yourself</h2> {/* Moved outside the form-container */}
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <select name="education" value={formData.education} onChange={handleInputChange}>
            <option value="">Select Education</option>
            <option value="highSchool">High School</option>
            <option value="bachelors">Bachelor's</option>
            <option value="masters">Master's</option>
            <option value="phd">PhD</option>
          </select>
          <select name="expertise" value={formData.expertise} onChange={handleInputChange}>
            <option value="">Select Level of Expertise</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <select name="interest" value={formData.interest} onChange={handleInputChange}>
            <option value="">Select Field of Interest</option>
            <option value="artificialIntelligence">Artificial Intelligence</option>
            <option value="dataScience">Data Science</option>
            <option value="biology">Biology</option>
            <option value="chemistry">Chemistry</option>
          </select>
          <button type="submit">Submit</button>
          </form>
        </div>
        <img src={whiteStar} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>hi naman</h6>
      </header>
    </div>
  );
};


export default Newtab;



