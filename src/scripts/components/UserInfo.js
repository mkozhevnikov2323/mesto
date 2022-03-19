
export class UserInfo {
constructor(userNameSelector, userDescriptionSelector) {
  this._userNameElement = document.querySelector(userNameSelector);
  this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userNameElement.textContent,
      job: this._userDescriptionElement.textContent
    };
    return userData;
  }

  setUserInfo() {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = job;
  }
}
