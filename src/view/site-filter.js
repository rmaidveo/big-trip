import Abstract from "./abstract.js";
const createFilterItemsTemplate = (filter, currentFilterType, eventsExistId) => {
  const {
    name,
    type
  } = filter;
  const isExistEvents = eventsExistId[name.toLowerCase()];
  return ` <div class="trip-filters__filter">
    <input id ="filter-${name.toLowerCase()}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value = "${name.toLowerCase()}"
    ${!isExistEvents ? `disabled` : ``}
     ${type === currentFilterType ? `checked` : ``}>
    <label class="trip-filters__filter-label"
    for="filter-${name.toLowerCase()}">${name}</label>
  </div>`;
};

const createSiteFilterTemplate = (filterItems, currentFilterType, eventsExistId) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemsTemplate(filter, currentFilterType, eventsExistId))
    .join(``);
  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

};

export default class SiteFilter extends Abstract {
  constructor(filters, currentFilterType, eventsExistId) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._eventsExistId = eventsExistId;
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filters, this._currentFilter, this._eventsExistId);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._onFilterTypeChange);
  }
}
