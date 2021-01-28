import dayjs from "dayjs";
import {TYPES, BLANK_TRIP} from "../constants.js";
import Abstract from "./abstract.js";
import he from "he";

const createEventTypeItemsTemplate = () => {
  return TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
          </div>`).join(``);
};
const createEventTypeItems = createEventTypeItemsTemplate();

const createEventTypeListItemsTemplate = (type) => {
  return `<label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
${createEventTypeItems}
        </fieldset>
      </div>`;
};

const renderOffersInTrip = (offers) => {
  let offer = ``;
  for (let i = 0; i < offers.title.length; i++) {
    offer += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offers.title[i]}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offers.price[i]}</span>
          </label>
        </div>`;
  }
  return offer;
};

const renderPhotos = (photos) => {
  let photoTemplate = photos.map((photo) =>
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``);
  if (photos.length > 0) {
    return `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${photoTemplate}
          </div>
      </div>`;
  }
  return ` `;

};

const renderDescript = (description, photos) => {
  const destinationPhotos = renderPhotos(photos);
  if (description.length > 0) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description"> ${description.join(` `)} </p>
          ${destinationPhotos}
    </section>`;
  }
  return ` `;
};

const createFormNewPointOfTripTemplate = (trip) => {
  const {start, end, type, offers, cost, destination} = trip;
  const {city, description, photos} = destination;
  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destinationDescription = renderDescript(description, photos);
  const eventsType = createEventTypeListItemsTemplate(type);
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
