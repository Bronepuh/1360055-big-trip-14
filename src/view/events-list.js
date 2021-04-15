import { createElement } from '../utils';

const createEventsListTemplate = (hasPoints) => {
  return hasPoints > 0 ? `<ul class="trip-events__list">
  </ul>` :
    `<ul class="trip-events__list">
  </ul>
    <p class="trip-events__msg">
        Click New Event to create your first point
    </p>`;
};

export default class EventsList {
  constructor(hasPoints) {
    this._hasPoints = hasPoints;
    this._element = null;
  }

  getTemplate() {
    return createEventsListTemplate(this._hasPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
