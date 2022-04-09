
export class UserInfo {
constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
  this._userNameElement = document.querySelector(userNameSelector);
  this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo(userDataFromServer) {
    const userData = {
      name: userDataFromServer.name,
      about: userDataFromServer.about,
      avatar: userDataFromServer.avatar
    };
    return userData;
  }

  setUserInfo(newUserData) {
    this._userNameElement.textContent = newUserData.name;
    this._userDescriptionElement.textContent = newUserData.about;
    this._userAvatarElement.src = newUserData.avatar;
  }
}
