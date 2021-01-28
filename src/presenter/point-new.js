import EditTrip from "../view/form-edit.js";
import TripListItems from "../view/trip-list-items";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../constants.js";
import {nanoid} from "nanoid";

export default class NewTrip {
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
    this._tripComponent = new TripListItems();
    this._tripEditComponent = new EditTrip(this._destinationsModel, this._offersModel);
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

  _onFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, point)
    );
    this.destroy();
  }

  _onDeleteClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
