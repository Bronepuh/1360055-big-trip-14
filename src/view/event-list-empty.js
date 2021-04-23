import AbstractView from './abstract';

const createEventsListEmptyTemplate = () => {
  return `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`;
};

export default class EventsListEmpty extends AbstractView {
  getTemplate() {
    return createEventsListEmptyTemplate();
  }
}
