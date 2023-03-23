import React, { useState, useEffect, useReducer } from "react";
import { API_BASE_URL } from "/kkj_data/kiosk/frontend/src/config/host-config";
import FormGroup from '@mui/material/FormGroup';

import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
/* API_BASE_URL= 'http://localhost:8080'; */
const NonOption = () => {

   const [selectedOption, setSelectedOption] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'checkbox1') {
      setIsChecked1(checked);
    } else if (name === 'checkbox2') {
      setIsChecked2(checked);
    } else if (name === 'checkbox3') {
      setIsChecked3(checked);
    }else if (name === 'checkbox4') {
        setIsChecked4(checked);
      }else if (name === 'checkbox5') {
        setIsChecked5(checked);
      }
  }; 


    return(
      /*   <div>옵셥!!!!!!!!</div> */
      <div>
      <h1>Option Page</h1>

      <form>
        <div>
          <h2>Select an option:</h2>
          <label>
            <input
              type="radio"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
            />
            Option 1
          </label>
          <label>
            <input
              type="radio"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
            />
            Option 2
          </label>
          <label>
            <input
              type="radio"
              value="option3"
              checked={selectedOption === 'option3'}
              onChange={handleOptionChange}
            />
            Option 3
          </label>
        </div>

        <div>
          <h2>Select some checkboxes:</h2>
          <label>
            <input
              type="checkbox"
              name="checkbox1"
              checked={isChecked1}
              onChange={handleCheckboxChange}
            />
            Checkbox 1
          </label>
          <label>
            <input
              type="checkbox"
              name="checkbox2"
              checked={isChecked2}
              onChange={handleCheckboxChange}
            />
            Checkbox 2
          </label>
          <label>
            <input
              type="checkbox"
              name="checkbox3"
              checked={isChecked3}
              onChange={handleCheckboxChange}
            />
            Checkbox 3
          </label>

          <label>
            <input
              type="checkbox"
              name="checkbox4"
              checked={isChecked4}
              onChange={handleCheckboxChange}
            />
            Checkbox 4
          </label>


          <label>
            <input
              type="checkbox"
              name="checkbox5"
              checked={isChecked5}
              onChange={handleCheckboxChange}
            />
            Checkbox 5
          </label>

        </div>

        <button type="submit">Submit</button>
      </form>
    </div> 
    
    );
    
  };
export default NonOption;