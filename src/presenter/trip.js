import TripInfo from "../view/trip-info.js";
import SiteSort from "../view/site-sort.js";
import TripList from "../view/trip-list";
import NoTrip from "../view/no-trips.js";
import TripPresenter from "./point.js";
import NewTripButtonfrom from "../view/new-trip-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";


export default class TripBoard {
  constructor(menuContainer, boardContainer, sorts) {
    this._menuContainer = menuContainer;
    this._boardContainer = boardContainer;
    this._tripListComponent = new TripList();
    this._tripSortComponent = new SiteSort(sorts);
    this._noTripComponent = new NoTrip();
    this._tripPresenter = {};
    this._onTripChange = this._onTripChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
  }

  init(boardTrips) {
    this._boardTrips = boardTrips.slice();

    render(this._boardContainer, this._tripListComponent, RenderPosition.AFTERBEGIN);
    this._renderBoard();
  }

  _onModeChange() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onTripChange(updatedTrip) {
    this._boardTrips = updateItem(this._boardTrips, updatedTrip);
    this._tripPresenter[updatedTrip.id].init(updatedTrip);
  }

  _renderSort() {
    render(this._tripListComponent, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderAddNewTripButton() {
    const addNewTripButton = new NewTripButtonfrom();
    render(this._menuContainer, addNewTripButton, RenderPosition.BEFOREEND);
  }

  _renderTrip(trip) {
    const tripPresenter = new TripPresenter(this._tripListComponent, this._onTripChange, this._onModeChange);
    tripPresenter.init(trip);
    this._tripPresenter[trip.id] = tripPresenter;
  }

  _renderTripInfo() {
    const tripInfo = new TripInfo(this._boardTrips[0]);
    render(this._menuContainer, tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderTrips() {
    this._boardTrips
    .forEach((boardTrip) => this._renderTrip(boardTrip));
  }

  _clearTripList() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
    remove(this._tripSortComponent);
  }

  _renderTripList() {
    if (this._boardTrips.length === 0) {
      this._renderNoTrips();
      return;
    }
    this._renderTripInfo();
    this._renderSort();
    this._renderTrips();
  }

  _renderNoTrips() {
    render(this._boardContainer, this._noTripComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    this._renderAddNewTripButton();
    this._renderTripList();
  }
}
