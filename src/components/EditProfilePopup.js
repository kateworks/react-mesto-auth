import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

// Редактирование профиля пользователя

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values, handleChange, handleInput,
    errors, isValid, resetForm,
  } = useFormWithValidation()

  useEffect(() => {
    resetForm();
    if (props.isOpen) {
      resetForm({ name: currentUser.name, info: currentUser.about }, {}, true);
    };
  }, [currentUser, props.isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({ name: values.name, info: values.info });
  };

  return (
    <PopupWithForm
      name="profile" size="l"
      title="Редактировать профиль"
      submitName={props.submitName}
      submitDisabled={!isValid}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="text"
          id="name" name="name"
          className={`
            popup__item popup__item_type_name
            ${ errors.name ? popupInputClass.inputError : '' }
          `}
          maxLength="40" minLength="2"
          placeholder="Имя" required
          value={values.name || ''}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span
          className={`popup__error ${popupInputClass.error}`}
          id="name-error"
        >
          {errors.name || ''}
        </span>
      </label>

      <label className="popup__field">
        <input type="text"
          id="info" name="info"
          className={`
            popup__item popup__item_type_info
            ${ errors.info ? popupInputClass.inputError : '' }
          `}
          maxLength="200" minLength="2"
          placeholder="О себе" required
          value={values.info || ''}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span
          className={`popup__error ${popupInputClass.error}`}
          id="info-error"
        >
          {errors.info || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
