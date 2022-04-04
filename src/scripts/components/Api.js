export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._token = options.headers.authorization
  }

  _createFetch(url, options = {}) {
    return fetch(url, options)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Запрос не выполнен: ${err}`))
  }

  getInitialCards() {
    return this._createFetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })
  }

  setNewCard(data) {
    return this._createFetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  getUserInfo() {
    return this._createFetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
  }

  setUserInfo(data) {
    return this._createFetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '65213cdc-9584-424f-b4a4-279d4b91e913',
    'Content-Type': 'application/json'
  }
});

