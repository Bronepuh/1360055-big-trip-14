import AbstractView from './abstract';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const addEventBtn = document.querySelector('.trip-main__event-add-btn');
    const menuItems = menuItem.parentNode.querySelectorAll('a');

    if (menuItem.textContent === 'Stats') {
      addEventBtn.setAttribute('disabled', true);
    } else if (menuItem.textContent === 'Table') {
      addEventBtn.removeAttribute('disabled', false);
    }

    menuItems.forEach((element) => {
      element.classList.remove('trip-tabs__btn--active');
      if (element.textContent === menuItem.textContent) {
        element.classList.add('trip-tabs__btn--active');
      }
    });
  }
}
