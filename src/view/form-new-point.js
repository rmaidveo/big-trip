import dayjs from "dayjs";
import {TYPES, BLANK_TRIP} from "../constants.js";
import Abstract from "./abstract.js";
import he from "he";
import {createEventTypeItemsTemplate, renderOffersInTrip, renderDescript} from "./form-edit.js";

const createFormNewPointOfTripTemplate = (trip) => {
  const {id, start, end, type, offers, cost, destination} = trip;
  const {city, description, photos} = destination;
  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destinationDescription = renderDescript(description, photos);
  const eventsType = createEventTypeItemsTemplate(TYPES, type, id);
  const offersList = renderOffersInTrip(offers);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
    ${eventsType}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
       ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-1">
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${starts}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ends}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersList}
      </div>
      </section>
      ${destinationDescription}
  </section>
</form>
</li> `;
};

export default class NewTrip extends Abstract {
  constructor(trip = BLANK_TRIP) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createFormNewPointOfTripTemplate(this._trip);
  }
}
