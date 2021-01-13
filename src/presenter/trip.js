import TripInfo from "../view/trip-info.js";
import SiteSort from "../view/site-sort.js";
import TripList from "../view/trip-list";
import NoTrip from "../view/no-trips.js";
import TripPresenter from "./point.js";
import TripNewPresenter from "./point-new.js";
import NewTripButtonfrom from "../view/new-trip-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction, FilterType} from "../constants.js";
import {sortByTime, sortByPrice, sortByDay} from "../utils/trip.js";
import {filter} from "../utils/filter.js";


export default class TripBoard {
  constructor(menuContainer, boardContainer, tripsModel, filterModel) {
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._menuContainer = menuContainer;
    this._boardContainer = boardContainer;
    this._tripListComponent = new TripList();
    this._currentSort = SortType.DEFAULT;
    this._tripSortComponent = null;
    this._addNewTripButton = new NewTripButtonfrom();
    this._noTripComponent = new NoTrip();
    this._tripPresenter = {};
    this._tripInfo = {};
    this._onViewActionChange = this._onViewActionChange.bind(this);
    this._onModelEventChange = this._onModelEventChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._tripNewPresenter = new TripNewPresenter(this._tripListComponent, this._onViewActionChange);
  }

  init() {
    render(this._boardContainer, this._tripListComponent, RenderPosition.AFTERBEGIN);
    this._tripsModel.addObserver(this._onModelEventChange);
    this._filterModel.addObserver(this._onModelEventChange);
    this._renderBoard();
  }

  _getTrips() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getPoints();
    const filtredTrips = filter[filterType](trips);

    switch (this._currentSort) {
      case SortType.TIME:
        return filtredTrips.sort(sortByTime());
      case SortType.PRICE:
        return filtredTrips.sort(sortByPrice());
    }
    return filtredTrips.sort(sortByDay());
  }

  createPoint() {
    this._currentSort = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripNewPresenter.init();
    remove(this._noTripComponent);
  }

  _onSortTypeChange(sortType) {
    if (this._currentSort === sortType) {
      return;
    }
    this._currentSort = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _onModeChange() {
    this._tripNewPresenter.destroy();
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onViewActionChange(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._tripsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._tripsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._tripsModel.deletePoint(updateType, update);
        break;
    }
  }

  _onModelEventChange(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderSort() {
    if (this._tripSortComponent !== null) {
      this._tripSortComponent = null;
    }
    this._tripSortComponent = new SiteSort(this._currentSort);
    this._tripSortComponent.setOnSortTypeClick(this._onSortTypeChange);
    render(this._tripListComponent, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderAddNewTripButton() {
    render(this._menuContainer, this._addNewTripButton, RenderPosition.BEFOREEND);
  }

  _renderTrip(trip) {
    const tripPresenter = new TripPresenter(this._tripListComponent, this._onViewActionChange, this._onModeChange);
    tripPresenter.init(trip);
    this._tripPresenter[trip.id] = tripPresenter;
  }

  _renderTripInfo(trip) {
    const tripInfo = new TripInfo(trip);
    this._tripInfo = tripInfo;
    render(this._menuContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderTrips(trips) {
    trips.forEach((trip) => this._renderTrip(trip));
  }

  _renderNoTrips() {
    render(this._boardContainer, this._noTripComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._tripNewPresenter.destroy();
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};

    remove(this._tripSortComponent);
    remove(this._noTripComponent);
    remove(this._tripInfo);

    if (resetSortType) {
      this._currentSort = SortType.DEFAULT;
    }

  }

  _renderBoard() {
    const trips = this._getTrips().slice();
    const tripCount = trips.length;
    if (tripCount === 0) {
      this._renderNoTrips();
      return;
    }

    this._renderTripInfo(trips[0]);
    this._renderSort();
    this._renderTrips(trips);
    this._renderAddNewTripButton();
  }

  hide() {
    this._tripListComponent.hide();
    this._tripSortComponent.hide();
    this._tripsModel.removeObserver(this._onModelEventChange);
    this._filterModel.removeObserver(this._onModelEventChange);

  }

  show() {
    this._tripListComponent.show();
    this._tripSortComponent.show();
    this._clearBoard({resetSortType: true});
    this._renderBoard();
    this._tripsModel.addObserver(this._onModelEventChange);
    this._filterModel.addObserver(this._onModelEventChange);
  }
}
