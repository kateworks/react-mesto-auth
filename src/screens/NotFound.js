import React from 'react';
import Header from '../components/Header';

function NotFound() {
  return(
    <div className="page">
      <Header />
      <section className="not-found">
        <h3 className="not-found__title">
          Ошибка 404
        </h3>
        <p className="not-found__subtitle">
          Страница не найдена
        </p>
      </section>
    </div>
  );

}

export default NotFound;