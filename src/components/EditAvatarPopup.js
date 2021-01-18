import React, {useContext, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import {popupInputClass} from '../utils/constants';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

// Редактирование пользователького аватара

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values, handleChange, handleInput,
    errors, isValid, resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    if (props.isOpen) {
      resetForm({ avatar: currentUser.avatar }, {}, true);
    } else {
      resetForm();
    };
  }, [currentUser, props.isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(values.avatar);
  };

  return (
    <PopupWithForm
      name="avatar" size="m"
      title="Обновить аватар"
      submitName={props.submitName}
      submitDisabled={!isValid}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="url"
          id="avatar" name="avatar"
          pattern="https?://.+"
          className={
            `popup__item popup__item_type_name
            ${errors.avatar ? popupInputClass.inputError : ''}`
          }
          placeholder="Ссылка на картинку" required
          value={values.avatar || ''}
          onChange={handleChange}
          onInput={handleInput}
        />
        <span
          className={`popup__error  ${popupInputClass.error}`}
          id="avatar-error"
        >
          {errors.avatar || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
