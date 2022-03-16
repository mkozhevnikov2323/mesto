import {
  userName,
  userProfession,
  popupName,
  popupProfession
} from "../utils/constants.js";

export class UserInfo {
  constructor(userData, submitEvent) {
    this._name = userData.name;
    this._job = userData.job;
    this._callBack = submitEvent;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return userData;
  }

  setUserInfo() {
    this._name = popupName.value;
    this._job = popupProfession.value;
  }

  changeData() {
    this._callBack();
  }
}
