export default class Destinations {
  static adaptToClient(destination) {
    const adaptedDestination = Object.assign(
      {},
      destination,
      {
        city: destination.name,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedDestination.name;
    return adaptedDestination;
  }

  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }
}
