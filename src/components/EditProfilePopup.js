import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [inputs, setInputs] = useState({
    name: { value: currentUser.name, isValid: true, },
    info: { value: currentUser.about, isValid: true, },
  });

  const [errorClasses, setErrorClasses] = useState({
    name: { input: '', error: '', }, 
    info: {  input: '', error: '', },
  });

  const [errorMessages, setErrorMessages] = useState({name: '', info: ''});

  useEffect(() => {
    if (props.isOpen) {
      setInputs({ 
        name: { value: currentUser.name, isValid: true, },
        info: { value: currentUser.about, isValid: true, },
      });      
    } else {
      setInputs({ 
        name: { value: '', isValid: false, },
        info: { value: '', isValid: false, },
      });
    }
    setErrorClasses({
      name: { input: '', error: '', }, 
      info: { input: '', error: '', },
    });
  }, [currentUser, props.isOpen]);

  const handleChange = (e) => {
    const {name, value, validity} = e.target;
    setInputs({...inputs, [name]: { value: value, isValid: validity.valid, }});
  };

  const handleInput = (e) => {
    const {name, value, validity, validationMessage} = e.target;
    setInputs({...inputs, [name]: { value: value, isValid: validity.valid, }});
    setErrorMessages({...errorMessages, [name]: validationMessage});
    setErrorClasses({...errorClasses,
      [name]: { 
        input: !validity.valid ? popupInputClass.inputError : '', 
        error: !validity.valid ? popupInputClass.error : '', 
      }, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({ name: inputs.name.value, info: inputs.info.value });
  };

  return (
    <PopupWithForm 
      name="profile" size="l" 
      title="Редактировать профиль" 
      submitName={props.submitName} 
      submitDisabled={!inputs.name.isValid || !inputs.info.isValid}
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="text" 
          id="name" name="name" 
          className={`popup__item popup__item_type_name ${errorClasses.name.input}`} 
          maxLength="40" minLength="2" 
          placeholder="Имя" required
          value={inputs.name.value}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span 
          className={`popup__error ${errorClasses.name.error}`} 
          id="name-error"
        >
          {errorMessages.name}
        </span>
      </label>

      <label className="popup__field">
        <input type="text" 
          id="info" name="info" 
          className={`popup__item popup__item_type_info ${errorClasses.info.input}`} 
          maxLength="200" minLength="2" 
          placeholder="О себе" required
          value={inputs.info.value}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span 
          className={`popup__error ${errorClasses.info.error}`} 
          id="info-error"
        >
          {errorMessages.info}
        </span>
      </label>
    </PopupWithForm> 
  );
}

export default EditProfilePopup;
