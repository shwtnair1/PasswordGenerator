import './App.css';
import React,{useState} from 'react';
import {numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './Characters';

function App() {
  const [state,setState] = useState({
    'password-strength':26,
    'uppercase-letters':false,
    'lowercase-letters':false,
    'include-numbers':false,
    'include-symbols':false,
  });
  const [password,setPassword] = useState('');

  const handleChange = (e) =>{
    if(e.target.name === 'password-strength')
    {
      setState(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }else{
      setState(prevState=>({...prevState,[e.target.name]:!prevState[e.target.name]}))
    }
  }

  const handleGeneratePassword = () =>{ console.log(state)
    let charSet = '';
    charSet = state['include-numbers'] ? charSet+numbers:charSet;
    charSet = state['include-symbols']  ? charSet+specialCharacters:charSet;
    charSet = state['lowercase-letters'] ?charSet+lowerCaseLetters:charSet;
    charSet = state['uppercase-letters'] ? charSet+upperCaseLetters:charSet;
    setPassword(generatePassword(charSet));
  }

  const generatePassword=(charSet)=>{
    let retVal = "";
    for (var i = 0, n = charSet.length; i < state['password-strength']; i++) {
        retVal += charSet.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-container">
          <div className="title-container">
              <h2>Password Generator</h2>
          </div>
          <div className="password-container">
            {password}
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input className="pw" 
              defaultValue={state['password-strength']}  
              type="number" 
              id="password-strength" 
              name="password-strength" 
              max="26" 
              min="8"
              onChange={handleChange}
               />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Add UpperCase letters</label>
            <input type="checkbox" id="uc" name="uppercase-letters" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase letters</label>
            <input type="checkbox" id="lc" name="lowercase-letters" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input type="checkbox" id="incnum" name="include-numbers" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input type="checkbox" id="incsym" name="include-symbols" onChange={handleChange} />
          </div>
          <button className='generate-button' onClick={handleGeneratePassword}>Generate Password</button>
        </div>
      </header>
    </div>
  );
}

export default App;
