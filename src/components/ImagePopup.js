import React, { useState, useEffect } from 'react';

// Всплывающее окно просмотра фотографии

function ImagePopup({ card, onClose }) {
  const [popupOpenClass, setPopupOpenClass] = useState('');

  const handleCloseClick = () => {
    setPopupOpenClass('');
    onClose();
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) handleCloseClick();
  };

  // Создание всплывающего окна
  useEffect(() => {

    const handleEscPress = (evt) => {
      if (evt.key === 'Escape') handleCloseClick();
    };

    // Добавляем обработку нажатия ESC
    document.addEventListener('keyup', handleEscPress);
    // Делаем окно видимым
    setPopupOpenClass('popup_opened');

    // Удаление всплывающего окна
    return (() => {
      // Удаляем обработчик нажатия ESC
      document.removeEventListener('keyup', handleEscPress);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div 
      className={`popup popup_content_image ${popupOpenClass}`}
      onClick={handleOverlayClick}
    >
      <div 
        className="popup__image-box"
      >
        <button 
          type="button" 
          className="popup__btn popup__btn_action_close shaded"
          title="Закрыть окно просмотра"
          onClick={handleCloseClick} 
        />

        <figure 
          className="popup__figure"
        >
          <img 
            className="popup__image" 
            src={card.link} 
            alt={card.title}
          />
          <figcaption 
            className="popup__image-caption"
          >
            {card.title}
          </figcaption>
        </figure>
      </div>
    </div>

  );
}

export default ImagePopup;