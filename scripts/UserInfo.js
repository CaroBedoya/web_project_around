export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._aboutElement.textContent.trim(),
    };
  }

  setUserInfo({ name, about }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
  }
}
