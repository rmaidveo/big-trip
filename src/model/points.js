import Observer from "../utils/observer.js";
import dayjs from "dayjs";

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
    const adaptedPoint = Object.assign({}, point,
        {
          start: dayjs(point.date_from),
          end: dayjs(point.date_to),
          destination: {
            city: point.destination.name,
            description: [point.destination.description],
            photos: point.destination.pictures,
          },
          cost: point.base_price,
          isFavorite: point.is_favorite,
          offers: {
            title: point.offers.map((ar) => ar.title),
            price: point.offers.map((ar) => ar.price)
          }
        });
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer({id, type, destination, start, end, cost, offers, isFavorite}) {
    return {
      "id": id,
      "type": type,
      "date_from": start,
      "date_to": end,
      "destination": {
        "name": destination.city,
        "description": destination.description.join(),
        "pictures": destination.photos,
      },
      "base_price": cost,
      "is_favorite": isFavorite,
      "offers": offers.title.map((i, ind) => ({
        "title": i,
        "price": offers.price[ind]
      }))
    };
  }

}
