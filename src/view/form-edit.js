import SmartView from "./smart.js";
import dayjs from "dayjs";
import {BLANK_TRIP} from "../constants.js";
import {capitalizeFirstLetter} from "../utils/common.js";
import flatpickr from "flatpickr";
import he from "he";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const pickersDelete = (...pickers) => {
  pickers.forEach((picker) => {
    if (picker) {
      picker.destroy();
      picker = null;
    }
  });
};

export const createEventTypeItemsTemplate = (allTypes, currentType, id, isDisabled) => {
  const types = allTypes.map((type) => `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"
             ${currentType === type ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${capitalizeFirstLetter(type)}</label>
          </div>`).join(``);

  return `
  <div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class = "event__type-icon"
        width = "17"
        height = "17"
        src = "img/icons/${currentType}.png"
        alt = "Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
    <div class="event__type-list">
    <fieldset class="event__type-group">
     <legend class="visually-hidden">Event type</legend>
${types}
         </fieldset>
                    </div>
                  </div>`;
};

export const renderOffersInTrip = (offers, selectedOffers, isDisabled) => {
  let offer = ` `;
  const {title, price} = offers;

  for (let i = 0; i < title.length; i++) {
    offer += `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" data-offer-price="${price[i]}" data-offer-name="${title[i]}" ${selectedOffers.title.includes(title[i]) ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
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

export const renderPhotos = (photos) => {
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

export const renderDescript = (description, photos) => {
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

export const createDestinationListTemplate = (options) => {
  if (options === null) {
    return ``;
  }

  return options.map((option) => {
    return `<option value="${option}"></option>`;
  }).join(``);
};

const createFormEditPointOfTripTemplate = (trip, destinationList, offersTypeList) => {
  const {
    id,
    start,
    end,
    type,
    cost,
    destination,
    offers,
    isDisabled,
    isSaving,
    isDeleting
  } = trip;
  let {city, description, photos} = destination;
  const optionsList = destinationList.map((i) =>{
    return Object.values(i)[0];
  });
  const TYPES = offersTypeList.map((i) =>{
    return Object.values(i)[0];
  });
  const offersBlank = offersTypeList.find((offer) => offer.type === type).offers;

  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destinationDescription = renderDescript(description, photos);
  const eventsType = createEventTypeItemsTemplate(TYPES, type, id, isDisabled);
  const offersList = renderOffersInTrip(offersBlank, offers, isDisabled);
  const options = createDestinationListTemplate(optionsList);
  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
<header class="event__header">
  ${eventsType}
     <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-${id}" autocomplete="off" required ${isDisabled ? `disabled` : ``}>
                    <datalist id="destination-list-${id}">
                       ${options}
                    </datalist>
                  </div>
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${starts}" ${isDisabled ? `disabled` : ``}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${ends}"  ${isDisabled ? `disabled` : ``}>
  </div>
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-${id}">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${cost}" autocomplete="off" ${isDisabled ? `disabled` : ``}>
  </div>
  <button class="event__save-btn  btn  btn--blue" type="submit"${isSaving || isDeleting ? `disabled` : ``} > ${isSaving ? `Saving...` : `Save`}</button>
  <button class="event__reset-btn" type="reset" ${isDeleting || isSaving ? `disabled` : ``}> ${isDeleting ? `Deleting...` : `Delete`}</button>
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
  constructor(trip = BLANK_TRIP, destinationModel, offersModel) {
    super();
    this._data = EditTrip.parseTripToData(trip);
    this._destinationList = destinationModel.getDestinations();
    this._offersList = offersModel.getOffers();
    this._datepickerstart = null;
    this._datepickerend = null;
    this._onClickTripEdit = this._onClickTripEdit.bind(this);
    this._onFormSubmitSave = this._onFormSubmitSave.bind(this);
    this._onTypeOfTripClick = this._onTypeOfTripClick.bind(this);
    this._onDestinationInputChange = this._onDestinationInputChange.bind(this);
    this._onStartDateChange = this._onStartDateChange.bind(this);
    this._onEndDateChange = this._onEndDateChange.bind(this);
    this._onCostChange = this._onCostChange.bind(this);
    this._formOnDeleteClick = this._formOnDeleteClick.bind(this);
    this._onOffersInputChange = this._onOffersInputChange.bind(this);
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setOnDeleteClick(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();
    pickersDelete(this._datepickerstart, this._datepickerend);
  }

  reset(trip) {
    this.updateData(
        EditTrip.parseTripToData(trip)
    );
  }

  getTemplate() {
    return createFormEditPointOfTripTemplate(this._data, this._destinationList, this._offersList);
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
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setOnClickTripEdit(this._callback.editClick);
  }

  _onTypeOfTripClick(evt) {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateData({
      type: newType,
      offers: this._offersList.find((offer) => offer.type === newType).offers
    });
  }

  _onDestinationInputChange(evt) {
    const newCity = evt.target.value;

    this.updateData({
      destination: {
        city: newCity,
        description: [this._destinationList.find((descriptionCity) => descriptionCity.city === newCity).description],
        photos: this._destinationList.find((photoCity) => photoCity.city === newCity).photos
      }
    });
  }

  _onOffersInputChange(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    let checkedOffers = this.getElement().querySelectorAll(`input.event__offer-checkbox:checked`);
    const checkedOffersTitle = Array.from(checkedOffers).map((checkedOffer) => checkedOffer.dataset.offerName);
    const checkedOffersPrice = Array.from(checkedOffers).map((checkedOffer) => Number(checkedOffer.dataset.offerPrice));
    this.updateData({offers: {
      title: checkedOffersTitle,
      price: checkedOffersPrice
    }
    });
  }

  _onStartDateChange(userDate) {
    if (dayjs(userDate).toDate() > dayjs(this._datepickerend.selectedDates).toDate()) {
      this.updateData({
        start: dayjs(userDate).toDate(),
        end: dayjs(userDate).toDate()
      });
    } else {
      this.updateData({
        start: dayjs(userDate).toDate()
      });
    }
  }

  _setStartDatepicker() {
    if (this._datepickerstart) {
      this._datepickerstart.destroy();
      this._datepickerstart = null;
    }

    this._datepickerstart = flatpickr(
        this.getElement().querySelector(`#event-start-time-${this._data.id}`), {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/Y H:i`,
          'defaultDate': this._data.start,
          'onClose': this._onStartDateChange
        }
    );
  }
  _onEndDateChange(userDate) {
    this.updateData({
      end: dayjs(userDate).toDate(),
      start: dayjs(this._data.start).toDate(),
    });
  }

  _onCostChange(evt) {
    evt.preventDefault();
    const userDate = Number(evt.target.value);
    this.updateData({
      cost: userDate
    });

  }

  _setEndDatepicker() {
    if (this._datepickerend) {
      this._datepickerend.destroy();
      this._datepickerend = null;
    }

    this._datepickerend = flatpickr(
        this.getElement().querySelector(`#event-end-time-${this._data.id}`), {
          'enableTime': true,
          'time_24hr': true,
          'minDate': dayjs(this._data.start).valueOf(),
          'dateFormat': `d/m/Y H:i`,
          'defaultDate': this._data.end,
          'onClose': this._onEndDateChange
        }
    );
  }

  _setInnerHandlers() {
    const offers = this.getElement().querySelector(`.event__available-offers`);
    if (offers) {
      offers.addEventListener(`change`, this._onOffersInputChange);
    }
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._onTypeOfTripClick);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._onDestinationInputChange);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._onCostChange);
  }

  _formOnDeleteClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnDeleteClick(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formOnDeleteClick);
  }

  static parseTripToData(trip) {
    return JSON.parse(JSON.stringify(Object.assign(
        {},
        trip,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    )));
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return JSON.parse(JSON.stringify(data));
  }
}
