import dayjs from "dayjs";
import Abstract from "./abstract.js";
import {BLANK_TRIP} from "../constants.js";
import {getAllCost} from "../utils/trip.js";

const createTripInfoTemplate = (trip) => {
  const {destination, start, end, cost, offers} = trip;
  const starts = dayjs(start).format(`MMM DD`);
  const ends = dayjs(end).format(`DD`);
  const total = getAllCost(cost, offers);
  const city = destination.city;

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${city}</h1>

  <p class="trip-info__dates">${starts}&nbsp;&mdash;&nbsp;${ends}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
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
