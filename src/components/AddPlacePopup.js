import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';

// Добавление карточки

function AddPlacePopup(props) {
  const [inputs, setInputs] = useState({ 
    title: { value: '', isValid: true, },
    link: { value: '', isValid: true, },
  });

  const [errorClasses, setErrorClasses] = useState({
    title: { input: '', error: '', }, 
    link: {  input: '', error: '', },
  });

  const [errorMessages, setErrorMessages] = useState({title: '', link: ''});

  useEffect(() => {
    setInputs({ 
      title: { value: '', isValid: false, },
      link: { value: '', isValid: false, },
    });
    setErrorClasses({
      title: { input: '', error: '', }, 
      link: { input: '', error: '', },
    });
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({title: inputs.title.value, link: inputs.link.value});
  };

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

  return (
    <PopupWithForm 
      name="card" size="l" 
      title="Новое место" 
      submitName={props.submitName} 
      submitDisabled={!inputs.title.isValid || !inputs.link.isValid}
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="text"
          id="title" name="title" 
          maxLength="30" minLength="1" 
          className={`popup__item popup__item_type_name ${errorClasses.title.input}`} 
          placeholder="Название" 
          required
          value={inputs.title.value}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span 
          className={`popup__error ${errorClasses.title.error}`} 
          id="title-error"
        >
          {errorMessages.title}
        </span>
      </label>

      <label className="popup__field">
        <input type="url"
          id="link" name="link" 
          pattern="https?://.+" 
          className={`popup__item popup__item_type_info ${errorClasses.link.input}`} 
          placeholder="Ссылка на картинку" 
          required
          value={inputs.link.value}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span 
          className={`popup__error ${errorClasses.link.error}`} 
          id="link-error"
        >
          {errorMessages.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;