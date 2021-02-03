import EditTripView from "../view/edit-point.js";
import TripListItemsView from "../view/trip-list-items";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, BLANK_TRIP} from "../constants.js";


export default class NewPoint {
  constructor(tripListContainer, changeData, destinationsModel, offersModel) {
    this._tripListContainer = tripListContainer;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._changeData = changeData;
    this._tripComponent = null;
    this._tripEditComponent = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);

  }

  init() {
    if (this._tripEditComponent !== null) {
      return;
    }
    this._tripComponent = new TripListItemsView();
    this._tripEditComponent = new EditTripView(BLANK_TRIP, this._destinationsModel, this._offersModel);
    render(this._tripListContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);
    this._tripEditComponent.setOnFormSubmitSave(this._onFormSubmit);
    this._tripEditComponent.setOnDeleteClick(this._onDeleteClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
  setSaving() {
    this._tripEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._tripEditComponent.shake(resetFormState);
  }
  _onFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _onDeleteClick() {
    this.destroy();
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`, `disabled`);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
