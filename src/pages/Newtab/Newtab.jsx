import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';
import whiteStar from "../../assets/img/whiteStar"

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
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