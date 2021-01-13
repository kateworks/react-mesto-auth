import React, { useEffect, useCallback } from 'react';

function PopupWithForm(props) {
  const openClass = props.isOpen && 'popup_opened';

  const handleCloseClick = props.onClose;

  const handleEscPress = useCallback((evt) => {
    if (evt.key === 'Escape') handleCloseClick();
  }, [handleCloseClick]);

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keyup', handleEscPress);
    } else {
      document.removeEventListener('keyup', handleEscPress);
    };
  }, [props.isOpen, handleEscPress]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) handleCloseClick();
  };

  return(
    <div
      className={`popup popup_content_${props.name} ${openClass}`}
      onClick={handleOverlayClick}
    >
    <div className="popup__container">

      <button
        type="button"
        className="popup__btn popup__btn_action_close shaded"
        title="Закрыть форму без сохранения данных"
        onClick={handleCloseClick}
      />

      <form
        name={props.name}
        className={`popup__form popup__form_size_${props.size}`}
        onSubmit={props.onSubmit}
      >
          <h3 className="popup__heading">
            {props.title}
          </h3>

          {props.children}

          <button
            type="submit" value="Создать"
            disabled={props.submitDisabled}
            className="popup__btn popup__btn_action_submit"
          >
              {props.submitName}
          </button>

      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;
