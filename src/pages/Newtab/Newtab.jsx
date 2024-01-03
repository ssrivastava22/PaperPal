import React, { useState } from 'react';
import { db } from '/Users/mohit/Downloads/aiatlsubmissoin/chrome-extension-boilerplate-react/src/pages/Newtab/firebase.mjs'
import { collection, addDoc } from 'firebase/firestore';
import './Newtab.css';
import './Newtab.scss';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const colRef = collection(db, "users");

      const docRef = await addDoc(colRef, formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  
  const onSignIn = (googleUser) => {
  
    console.log("User signed in with Google");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tell me about yourself</h2>
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
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      </header>
    </div>
  );
};

export default Newtab;





