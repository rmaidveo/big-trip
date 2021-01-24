import dayjs from "dayjs";
import Abstract from "./abstract.js";
import {CITIES, OFFERS} from "../constants.js";
import {getAllCost} from "../utils/trip.js";

const BLANK_TRIP = {
  start: dayjs().format(`MMM DD`),
  end: dayjs().format(`DD`),
  offers: {
    title: OFFERS[0],
    price: 0
  },
  city: CITIES[0],
  cost: 0,
  total: 0
};

const createTripInfoTemplate = (trip) => {
  const {city, start, end, cost, offers} = trip;
  const starts = dayjs(start).format(`MMM DD`);
  const ends = dayjs(end).format(`DD`);
  // const all = getAllCost(cost, offers);
  // console.log(all);
  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${city}</h1>

  <p class="trip-info__dates">${starts}&nbsp;&mdash;&nbsp;${ends}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
</p>
</section>`;

};
export default class TripInfo extends Abstract {
  constructor(trip = BLANK_TRIP) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trip);
  }
}
