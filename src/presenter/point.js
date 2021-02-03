import TripListItems from "../view/trip-list-items";
import EditPoint from "../view/edit-point";
import {isOnline} from "../utils/common.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType, Mode, State} from "../constants.js";
import {toast} from "../utils/toast/toast.js";

export default class Point {
  constructor(tripListContainer, changeData, changeMode, destinationsModel, offersModel) {
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._tripListContainer = tripListContainer;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onPoinClick = this._onPoinClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  init(point) {
    this._point = point;
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointComponent = new TripListItems(this._point);
    this._pointEditComponent = new EditPoint(this._point, this._destinationsModel, this._offersModel);
    this._pointComponent.setOnFavoriteClick(this._onFavoriteClick);
    this._pointComponent.setOnClickTripPoint(this._onEditClick);
    this._pointEditComponent.setOnFormSubmitSave(this._onFormSubmit);
    this._pointEditComponent.setOnClickTripEdit(this._onPoinClick);
    this._pointEditComponent.setOnDeleteClick(this._onDeleteClick);


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._tripListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._pointEditComponent.shake(resetFormState);
        this._pointComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToCard();
    }
  }

  _onFavoriteClick() {
    if (!isOnline()) {
      toast(`You can't edit point offline`);
      return;
    }
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  _onEditClick() {
    if (!isOnline()) {
      toast(`You can't edit point offline`);
      return;
    }
    this._replaceCardToForm();
  }

  _onPoinClick(point) {
    this._changeData(point);
    this._replaceFormToCard();
  }

  _onFormSubmit(point) {
    if (!isOnline()) {
      toast(`You can't save point offline`);
      return;
    }
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _onDeleteClick(point) {
    if (!isOnline()) {
      toast(`You can't delete point offline`);
      return;
    }

    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }
}
