import React, {useState, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import ImagePopup from '../components/ImagePopup';
import ConfirmPopup from '../components/ConfirmPopup';

import api from '../utils/api';
import profileAvatar from '../images/profile-avatar.jpg';
import {initialCards} from '../utils/cards-init';

function HomePage(props) {
  const [currentUser, setCurrentUser] = useState({
    _id: 0,
    name: 'Екатерина',
    about: '(без доступа в сеть)',
    avatar: profileAvatar,
  });

  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [profileSubmitName, setProfileSubmitName] = useState('Сохранить');
  const [avatarSubmitName, setAvatarSubmitName] = useState('Сохранить');
  const [addPlaceSubmitName, setAddPlaceSubmitName] = useState('Создать');
  const [deleteCardSubmitName, setDeleteCardSubmitName] = useState('Да');

  const [isLoading, setIsLoading] = useState(false);

  // Читаем данные с сервера
  useEffect(() => {
    setIsLoading(true);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {

      setCurrentUser({
        _id: userData._id,
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
      });

      setCards(cardsData.map(item => {
        return {
          title: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner._id,
          id: item._id
        };
      }));
    })
    .catch((error) => {
      console.log(`Ошибка загрузки данных: ${error}.`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Обновление информации о пользователе на сервере
  const handleUpdateUser = ({name, info}) => {
    setProfileSubmitName('Сохранение...');
    api.patchUserProfile({name, info})
      .then((res) => {
        console.log(`Информация о пользователе сохранена.`);
        setCurrentUser({...currentUser, name: res.name, about: res.about});
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Невозможно сохранить данные на сервере. ${err}.`);
      })
      .finally(() => {
        setProfileSubmitName('Сохранить');
      });
  };

  // Обновление пользовательского аватара на сервере
  const handleUpdateAvatar = (newAvatarLink) => {
    setAvatarSubmitName('Сохранение...');
    api.patchNewAvatar({avatar: newAvatarLink})
    .then((res) => {
      setCurrentUser({...currentUser, avatar: res.avatar});
      setEditAvatarPopupOpen(false);
    })
    .catch((err) => {
      console.log(`Невозможно обновить аватар на сервере. ${err}.`);
    })
    .finally(() => {
      setAvatarSubmitName('Сохранить');
    });
  };

  const handleCardLike = (card) => {
    const isLiked = (card.likes.some(
      likeAuthor => likeAuthor._id === currentUser._id
    ));
    const likeAction = isLiked ? 'удалить' : 'поставить';
    const likeFunc = isLiked ? id => api.unlikeCard(id) : id => api.likeCard(id);

    // Ставим или удаляем лайк в зависимости от его текущего состояния
    likeFunc(card.id)
      .then((res) => {
        // Если запрос выполнен успешно, создаем новую карточку
        const changedCard = {
          title: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner._id,
          id: res._id
        };
        // Выполняем замену карточки
        const newCards = cards.map((currentCard) => (
          currentCard.id === card.id ? changedCard : currentCard
        ));
        // Обновляем состояние
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Невозможно ${likeAction} лайк. Ошибка ${err}.`);
      });
  };

  // Удаление карточки
  const handleDeleteButtonClick = (card) => {
    setDeletedCard(card);
  };

  const handleCardDelete = (card) => {
    setDeleteCardSubmitName('Удаление...');
    api.deleteCard(card.id)
      .then((res) => {
        // Исключаем из массива удаленную карточку
        const newCards = cards.filter((currentCard) => (
          currentCard.id !== card.id
        ));
        // Обновляем состояние
        setCards(newCards);
        console.log(`Карточка ${card.id} удалена.`);
        setDeletedCard(null);
      })
      .catch((err) => {
        console.log(`Невозможно удалить карточку. Ошибка ${err}.`);
      })
      .finally(() => {
        setDeleteCardSubmitName('Да');
      });
  };

  const handleAddPlace = (newPlace) => {
    setAddPlaceSubmitName('Сохранение...');
    api.postNewCard({name: newPlace.title, link: newPlace.link})
      .then((res) => {
        const newCard = {
          title: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner._id,
          id: res._id
        };
        setCards([newCard, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
      })
      .finally(() => {
        setAddPlaceSubmitName('Создать');
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header>
          <p className="nav-menu__text nav-menu__text_type_email">
            {props.email}
          </p>
          <p className="nav-menu__text" onClick={props.onLogout}>
            Выйти
          </p>
        </Header>
        <Main
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteButtonClick}
          cards={cards}
          isLoading={isLoading}
        />
        <Footer />

        {/* Просмотр фотографии */}
        { selectedCard &&
          <ImagePopup
            card={selectedCard}
            onClose={ () => setSelectedCard(null) }
          />
        }
        {/* Редактирование профиля пользователя */}
        <EditProfilePopup
          submitName={profileSubmitName}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={() => setEditProfilePopupOpen(false)}
        />

        {/* Обновление аватара пользователя */}
        <EditAvatarPopup
          submitName={avatarSubmitName}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={() => setEditAvatarPopupOpen(false)}
        />

        {/* Добавление карточки */}
        <AddPlacePopup
          submitName={addPlaceSubmitName}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={() => setAddPlacePopupOpen(false)}
        />

        <ConfirmPopup
          submitName={deleteCardSubmitName}
          card={deletedCard}
          onConfirm={handleCardDelete}
          onClose={() => setDeletedCard(null)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default HomePage;
