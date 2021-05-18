import AbstractView from './abstract';

export default class Smart extends AbstractView {

  updateState(update, rerender = true) {

    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if(rerender) {
      this.updateElement();
      this.restoreHandlers();
    }
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }

  restoreHandlers() {
    throw new Error('Переопределите метод');
  }
}
