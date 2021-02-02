import FilterView from "../view/site-filter.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {FilterType, UpdateType} from "../constants.js";
import {filter} from "../utils/filter.js";

export default class Filter {
  constructor(filterContainer, filterModel, tripsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tripsModel = tripsModel;
    this._currentFilter = null;
    this._filterComponent = null;
    this._eventsExistId = {};
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const points = this._tripsModel.getPoints();
    const prevFilterComponent = this._filterComponent;
    this._currentFilter = this._filterModel.getFilter();
    this._eventsExistId[FilterType.EVERYTHING] = Boolean(points.length);
    this._eventsExistId[FilterType.PAST] = Boolean(filter[FilterType.PAST](points).length);
    this._eventsExistId[FilterType.FUTURE] = Boolean(filter[FilterType.FUTURE](points).length);
    this._filterComponent = new FilterView(filters, this._currentFilter, this._eventsExistId);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: `Everything`
      },
      {
        type: FilterType.FUTURE,
        name: `Future`
      },
      {
        type: FilterType.PAST,
        name: `Past`,
      }
    ];
  }
}
