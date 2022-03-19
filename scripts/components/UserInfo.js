import {
  userName,
  userProfession,
  popupName,
  popupProfession
} from "../utils/constants.js";

export class UserInfo {
constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userData = {
      name: this._name,
      job: this._job
    };
    return userData;
  }

  setUserInfo() {
    userName.textContent = popupName.value;
    userProfession.textContent = popupProfession.value;
  }
}
