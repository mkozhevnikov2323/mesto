export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl,
    this.headers = options.headers
  }


}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '65213cdc-9584-424f-b4a4-279d4b91e913',
    'Content-Type': 'application/json'
  }
});
