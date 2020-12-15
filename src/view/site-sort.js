import AbstractView from "./abstract.js";

const createSortItemsTemplate = (sort, currentSortType) => {
  const {name, type} = sort;
  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort" value="sort-${name}"
  data-sort-type="${name}"
  ${name === `offers` || name === `event` ? `disabled` : ``}
  ${type === currentSortType ? `checked` : ``}>
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const createSortTripTemplate = (sortItems, currentSortType) => {
  const sortItemsTemplate = sortItems
  .map((sort) => createSortItemsTemplate(sort, currentSortType))
  .join(``);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortItemsTemplate}
</form>`;

};
export default class SiteSort extends AbstractView {
  constructor(sorts, currentSortType) {
    super();
    this._sorts = sorts;
    this._currentSort = currentSortType;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  getTemplate() {
    return createSortTripTemplate(this._sorts, this._currentSort);
  }

  _onSortTypeChange(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`change`, this._onSortTypeChange);
  }

}
