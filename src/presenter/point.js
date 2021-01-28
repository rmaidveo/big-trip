import TripListItems from "../view/trip-list-items";
import EditTrip from "../view/form-edit";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType, Mode} from "../constants.js";

export default class Point {
  constructor(tripListContainer, changeData, changeMode) {
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._tripListContainer = tripListContainer;
    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onPoinClick = this._onPoinClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;
    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;
    this._tripComponent = new TripListItems(this._trip);
    this._tripEditComponent = new EditTrip(this._trip);
    this._tripComponent.setOnFavoriteClick(this._onFavoriteClick);
    this._tripComponent.setOnClickTripPoint(this._onEditClick);
    this._tripEditComponent.setOnFormSubmitSave(this._onFormSubmit);
    this._tripEditComponent.setOnClickTripEdit(this._onPoinClick);
    this._tripEditComponent.setOnDeleteClick(this._onDeleteClick);


    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this._tripListContainer, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }

  _onFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._trip,
            {
              isFavorite: !this._trip.isFavorite
            }
        )
    );
  }

  _onEditClick() {
    this._replaceCardToForm();
  }

  _onPoinClick(trip) {
    this._changeData(trip);
    this._replaceFormToCard();
  }

  _onFormSubmit(trip) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        trip
    );
    this._replaceFormToCard();
  }

  _onDeleteClick(trip) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        trip
    );
  }
}
