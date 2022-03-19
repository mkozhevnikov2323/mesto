export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    const handleEscClose = (evt) => this._handleEscClose(evt);
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
  }

  close() {
    const handleEscClose = (evt) => this._handleEscClose(evt);
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }
}
