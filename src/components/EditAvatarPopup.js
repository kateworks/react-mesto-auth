import React, {useContext, useEffect, useRef, useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';

// Редактирование пользователького аватара

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorClasses, setErrorClasses] = useState({input: '', error: '', });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      inputRef.current.value = currentUser.avatar;
      setIsSubmitDisabled(false);
    } else {
      inputRef.current.value = '';
      setIsSubmitDisabled(true);
    };
    setErrorMessage('');
    setErrorClasses({input: '', error: '', });
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  };

  const handleInput = (e) => {
    const {validity, validationMessage} = e.target;
    setErrorMessage(validationMessage);
    setErrorClasses({
      input: !validity.valid ? popupInputClass.inputError : '', 
      error: !validity.valid ? popupInputClass.error : '', 
    });
    setIsSubmitDisabled(!validity.valid);
  };

  return (
    <PopupWithForm 
      name="avatar" size="m" 
      title="Обновить аватар" 
      submitName={props.submitName} 
      submitDisabled={isSubmitDisabled}      
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="url" ref={inputRef}
          id="avatar" name="avatar" 
          pattern="https?://.+" 
          className={`popup__item popup__item_type_name ${errorClasses.input}`}  
          placeholder="Ссылка на картинку" 
          required
          onInput={handleInput}
        />
        <span
          className={`popup__error ${errorClasses.error}`}  
          id="avatar-error"
        >
          {errorMessage}
        </span>  
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
