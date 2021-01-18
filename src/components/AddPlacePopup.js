import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

// Добавление карточки

const AddPlacePopup = (props) => {
  const {
    values, handleChange, handleInput,
    errors, isValid, resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace(values);
  };

  return (
    <PopupWithForm
      name="card" size="l"
      title="Новое место"
      submitName={props.submitName}
      submitDisabled={!isValid}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="text"
          id="title" name="title"
          maxLength="30" minLength="1"
          className={
            `popup__item popup__item_type_name
            ${errors.title ? popupInputClass.inputError : ''}`
          }
          placeholder="Название"
          required
          value={values.title || ''}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span
          className={`popup__error ${popupInputClass.error}`}
          id="title-error"
        >
          {errors.title || ''}
        </span>
      </label>

      <label className="popup__field">
        <input type="url"
          id="link" name="link"
          pattern="https?://.+"
          className={
            `popup__item popup__item_type_info
            ${errors.link ? popupInputClass.inputError : ''}`
          }
          placeholder="Ссылка на картинку"
          required
          value={values.link || ''}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span
          className={`popup__error ${popupInputClass.error}`}
          id="link-error"
        >
          {errors.link || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;