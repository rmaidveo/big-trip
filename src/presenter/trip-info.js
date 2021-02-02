import {remove, render, RenderPosition} from "../utils/render";
import {sortByDay} from "../utils/trip";
import TripInfoView from "../view/trip-info.js";

export default class Info {
  constructor(headerContainer, pointsModel) {
    this._headerContainer = headerContainer;
    this._pointsModel = pointsModel;
    this._tripInfoComponent = null;
    this._onModelEventChange = this._onModelEventChange.bind(this);
    this._pointsModel.addObserver(this._onModelEventChange);
  }

  init() {
    const prevTripInfoComponent = this._tripInfoComponent;

    if (prevTripInfoComponent !== null) {
      remove(prevTripInfoComponent);
    }
    this._renderInfoComponent();
  }

  _renderInfoComponent() {
    if (this._pointsModel.getPoints().length === 0) {
      return;
    }
    const points = this._pointsModel.getPoints().slice().sort(sortByDay);

    this._tripInfoComponent = new TripInfoView(points);
    render(this._headerContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _destroyInfoComponent() {
    if (this._infoComponent === null) {
      return;
    }

    remove(this._tripInfoComponent);
    this._tripInfoComponent = null;
  }

  _onModelEventChange() {
    this._destroyInfoComponent();
    this._renderInfoComponent();
  }
}
