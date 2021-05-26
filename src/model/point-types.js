export default class PointsTypes {
  constructor() {
    this._pointsTypes = [];
  }

  setPointsTypes(pointsTypes) {
    this._pointsTypes = pointsTypes.slice();
  }

  getPointsTypes() {
    return this._pointsTypes;
  }
}
