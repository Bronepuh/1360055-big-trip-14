export const createEventsListTemplate = (hasPoints) => {
  return hasPoints > 0 ? `<ul class="trip-events__list">
  </ul>` :
    `<ul class="trip-events__list">
  </ul>
    <p class="trip-events__msg">
        Click New Event to create your first point
    </p>`;
};
