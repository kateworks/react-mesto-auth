import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onClick, onLike, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwned = card.owner === currentUser._id;

  const handleClick = () => {
    onClick(card);
  };

  const handleLike = () => {
    onLike(card);
  };

  const handleDelete = () => {
    onDelete(card);
  };

  return(
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.title}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.title}</h2>
        <div className="card__like-group">
          <button
            className={
              `card__btn card__btn_action_like shaded
              ${card.likes.length > 0 ? 'card__btn_clicked' : ''}`
            }
            onClick={handleLike}
            title="Нравится"
          />
          <span className="card__like-num">
            {card.likes.length}
          </span>
        </div>
      </div>

      <button
        className="card__btn card__btn_action_del shaded"
        disabled={!isOwned}
        hidden={!isOwned}
        onClick={handleDelete}
        title="Удалить"
      />
    </li>
  );

}

export default Card;