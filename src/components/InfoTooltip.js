import React, {useState, useEffect} from 'react';

const InfoToolTip = (props) => {
  const [popupOpenClass, setPopupOpenClass] = useState('');

  const handleCloseClick = () => {
    setPopupOpenClass('');
    props.onClose();
  };

  useEffect(() => {
    setPopupOpenClass('popup_opened');
  }, []);

  return (
    <div className={`popup ${popupOpenClass}`}>
      <div className="popup__container">

        <button
          type="button"
          className="popup__btn popup__btn_action_close shaded"
          title="Закрыть форму"
          onClick={handleCloseClick}
        />

        <div className="popup__message-box">
          <img
            className="popup__message-icon"
            src={props.imageLink}
            alt={props.textMessage}
          />
          <p className="popup__message-text">
            {props.textMessage}
          </p>
        </div>

      </div>
    </div>
  );
};

export default InfoToolTip;
