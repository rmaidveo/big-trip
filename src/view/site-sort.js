import AbstractView from "./abstract.js";
const createSortItemsTemplate = (sort, isChecked) => {
  const {
    name,
    count
  } = sort;
  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort" value="sort-${name}"
  ${name === `offers` || name === `event` ? `disabled` : ``}
  ${isChecked ? `checked` : ``}
  ${count === 0 ? `disabled` : ``}>
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const createSortTripTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
  .map((sort, index) => createSortItemsTemplate(sort, index === 0))
  .join(``);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortItemsTemplate}
</form>`;

};
export default class SiteSort extends AbstractView {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTripTemplate(this._sorts);
  }
}