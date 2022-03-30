export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl,
    this.token = options.headers.authorization
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `${this.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      // .then((data) => {
      //   console.log(data.name);
      // })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `${this.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        // console.log(data.name);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '65213cdc-9584-424f-b4a4-279d4b91e913',
    'Content-Type': 'application/json'
  }
});

