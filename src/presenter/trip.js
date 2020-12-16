import TripInfo from "../view/trip-info.js";
import SiteSort from "../view/site-sort.js";
import TripList from "../view/trip-list";
import NoTrip from "../view/no-trips.js";
import TripPresenter from "./point.js";
import NewTripButtonfrom from "../view/new-trip-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem, sortsTypeOnMap} from "../utils/common.js";
import {SortType} from "../constants.js";
import {sortByTime, sortByPrice, sortByDay} from "../utils/trip.js";
const sortList = sortsTypeOnMap();


export default class TripBoard {
  constructor(menuContainer, boardContainer) {
    this._menuContainer = menuContainer;
    this._boardContainer = boardContainer;
    this._tripListComponent = new TripList();
    this._currentSort = SortType.DEFAULT;
    this._sortsList = sortList;
    this._tripSortComponent = new SiteSort(this._sortsList, this._currentSort);
    this._noTripComponent = new NoTrip();
    this._tripPresenter = {};
    this._tripInfo = {};
    this._onTripChange = this._onTripChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  init(boardTrips) {
    this._boardTrips = boardTrips.slice().sort(sortByDay());
    this._sourcedBoardTrips = this._boardTrips.slice();

    render(this._boardContainer, this._tripListComponent, RenderPosition.AFTERBEGIN);
    this._renderBoard();
  }

  _sortTrips(sortType) {

    switch (sortType) {
      case SortType.TIME:
        this._boardTrips.sort(sortByTime());
        break;
      case SortType.PRICE:
        this._boardTrips.sort(sortByPrice());
        break;
      default:
        this._boardTrips = this._sourcedBoardTrips.slice();
    }

    this._currentSortType = sortType;
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTrips(sortType);
    this._clearTripList();
    this._renderTripList();
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
    this._tripSortComponent.setOnSortTypeChange(this._onSortTypeChange);
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
    this._tripInfo = tripInfo;
    render(this._menuContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
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
    remove(this._tripInfo);
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
