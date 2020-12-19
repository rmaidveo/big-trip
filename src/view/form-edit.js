import SmartView from "./smart.js";
import dayjs from "dayjs";
import {TYPES, CITIES, OFFERS} from "../constants.js";
import {CITY} from "../mock/trip.js";

const BLANK_TRIP = {
  start: dayjs().format(`DD/MM/YY HH:MM`),
  end: dayjs().format(`DD/MM/YY HH:MM`),
  type: TYPES[0],
  offers: {
    title: OFFERS[0],
    price: 0
  },
  city: CITIES[0],
  cost: 0,
  destination: {
    description: [],
    photos: []
  }
};

const createEventTypeItemsTemplate = (currentType) => {
  const types = TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"
             ${currentType === type ? `checked` : ``}>
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
          </div>`).join(``);

  return `
  <div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class = "event__type-icon"
        width = "17"
        height = "17"
        src = "img/icons/${currentType}.png"
        alt = "Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
    <fieldset class="event__type-group">
     <legend class="visually-hidden">Event type</legend>
${types}
         </fieldset>
                    </div>
                  </div>`;
};

const renderOffersInTrip = (offers) => {
  let offer = ` `;
  const {title, price} = offers;

  for (let i = 0; i < title.length; i++) {
    offer += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-${i}">
            <span class="event__offer-title">${title[i]}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price[i]}</span>
          </label>
        </div>`;
  }
  if (title.length > 0) {
    return ` <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offer}
    </div>
    </section>`;
  }
  return offer;
};

const renderPhotos = (photos) => {
  let photoTemplate = photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
  if (photos.length > 0) {
    return `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${photoTemplate}
          </div>
      </div>`;
  }
  return ` `;

};

const renderDescript = (destination) => {
  const {
    description,
    photos
  } = destination;
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

const createFormEditPointOfTripTemplate = (trip) => {
  const {
    start,
    end,
    type,
    offers,
    city,
    cost,
    destination
  } = trip;
  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destinationDescription = renderDescript(destination);
  const eventsType = createEventTypeItemsTemplate(type);
  const offersList = renderOffersInTrip(offers);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
<header class="event__header">

  ${eventsType}

     <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="${type}"></option>
                    </datalist>
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
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
    ${offersList}
    ${destinationDescription}
</form>
</li> `;
};
export default class EditTrip extends SmartView {
  constructor(trip = BLANK_TRIP) {
    super();
    this._data = EditTrip.parseTripToData(trip);
    this._onClickTripEdit = this._onClickTripEdit.bind(this);
    this._onFormSubmitSave = this._onFormSubmitSave.bind(this);
    this._onTypeOfTripClick = this._onTypeOfTripClick.bind(this);
    this._onDestinationInputChange = this._onDestinationInputChange.bind(this);
    this._setInnerHandlers();
  }

  reset(trip) {
    this.updateData(
        EditTrip.parseTripToData(trip)
    );
  }

  getTemplate() {
    return createFormEditPointOfTripTemplate(this._data);
  }

  _onClickTripEdit(evt) {
    evt.preventDefault();
    this._callback.editClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnClickTripEdit(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onClickTripEdit);
  }

  _onFormSubmitSave(evt) {
    evt.preventDefault();
    this._callback.submitClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnFormSubmitSave(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmitSave);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setOnFormSubmitSave(this._callback.submitClick);
    this.setOnClickTripEdit(this._callback.editClick);
  }

  _onTypeOfTripClick(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _onDestinationInputChange(evt) {
    const newCity = evt.target.value;
    Object.assign({},
        this._data.destination,
        this._data.city,
        this._data.city = newCity,
        this._data.destination.description = CITY[newCity][0],
        this._data.destination.photos = CITY[newCity][1]);
    this.updateData(
        this._data.city,
        this._data.destination
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._onTypeOfTripClick);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._onDestinationInputChange);
  }
  static parseTripToData(trip) {
    return JSON.parse(JSON.stringify(trip));
  }

  static parseDataToTrip(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
