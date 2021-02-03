import AbstractView from "./abstract";
import dayjs from "dayjs";
import {getAllCost} from "../utils/trip.js";
import {getDestinationPointsSearch, getTotalPricePoints, getTotaloffersPoints} from "../utils/trip-info.js";

const createInfoTemplate = (points) => {
  const pointsOfDestination = (getDestinationPointsSearch(points).length > 3) ?
    `${getDestinationPointsSearch(points)[0]} &mdash; &mldr; &mdash; ${getDestinationPointsSearch(points)[getDestinationPointsSearch(points).length - 1]}`
    : getDestinationPointsSearch(points).join(` &mdash; `);
  const cost = getTotalPricePoints(points);
  const offers = getTotaloffersPoints(points);
  const total = getAllCost(cost, offers);
  const start = dayjs(points[0].start).format(`MMM DD`);
  const end = dayjs(points[points.length - 1].end).format(`MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${pointsOfDestination}</h1>
      <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
