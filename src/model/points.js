import dayjs from "dayjs";
import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          isFavorite: point.is_favorite,
          start: new Date(point.date_from),
          end: new Date(point.date_to),
          cost: point.base_price,
          destination: {
            description: point.destination.description,
            photos: point.destination.pictures
          },
          city: point.destination.name
        }
    );
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.destination;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "is_favorite": point.isFavorite,
          "date_from": point.start,
          "date_to": point.start,
          "base_price": point.cost,
          "destination" : {
            "description": point.destinationList,
            "name": point.city,
            "pictures": point.photo
          }
        }
    );

    delete adaptedPoint.isFavorite;
    delete adaptedPoint.start;
    delete adaptedPoint.end;
    delete adaptedPoint.cost;
    delete adaptedPoint.destinationList;

    return adaptedPoint;
  }

}
