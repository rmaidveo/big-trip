import dayjs from "dayjs";
import {CITIES, OFFERS} from "../constants.js";
import {createElement, getAllCost} from "../utils.js";

const BLANK_TRIP = {
  start: dayjs().format(`MMM DD`),
  end: dayjs().format(`DD`),
  offers: {
    title: OFFERS[0],
    price: 0
  },
  city: CITIES[0],
  cost: 0
};

const createTripInfoTemplate = (trip) => {
  const {city, start, end, cost, offers} = trip;
  const starts = dayjs(start).format(`MMM DD`);
  const ends = dayjs(end).format(`DD`);
  const allCost = getAllCost(cost, offers);
  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${city}</h1>

  <p class="trip-info__dates">${starts}&nbsp;&mdash;&nbsp;${ends}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${allCost}</span>
</p>
</section>`;
};
export default class TripInfo {
  constructor(trip = BLANK_TRIP) {
    this._element = null;
    this._trip = trip;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trip);
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
