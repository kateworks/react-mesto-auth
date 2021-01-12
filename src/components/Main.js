import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Loader from './Loader';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">

        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img 
            src={currentUser.avatar} 
            className="profile__image" 
            alt="Аватар профиля" 
            title="Изменить аватар профиля"
          />
        </div>
        
        <div className="profile__description">
          <h1 className="profile__name">
            {currentUser.name}
          </h1>
          <button 
            className="profile__btn profile__btn_action_edit shaded"
            title="Редактировать профиль" 
            onClick={props.onEditProfile} 
          />
          <p className="profile__work">{currentUser.about}</p>
        </div>

        <button 
          className="profile__btn profile__btn_action_add shaded" 
          onClick={props.onAddPlace} 
          title="Добавить фотографию" 
        />
      </section>

      <section className="photo-grid">
      { props.isLoading 
        ? <Loader/>
        : <ul className="photo-grid__list">
            {props.cards.map((card) => (
              <Card key={card.id}
                card={card} 
                onClick={props.onCardClick}
                onLike={props.onCardLike}
                onDelete={props.onCardDelete}
              />
            ))}        
          </ul>
      } 
      </section>
    </main>
  );
}

export default Main;
