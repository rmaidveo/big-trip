import dayjs from "dayjs";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getAllCost = (cost, offers) => {
  let allcost = cost;
  for (let i = 0; i < offers.price.length; i++) {
    allcost += offers.price[i];
  }
  return allcost;
};


export const isTripPlanned = (date) => {
  return dayjs().isBefore(date, `D`) ? false : dayjs().isAfter(date, `D`);
};

export const isTripExpired = (date) => {
  return dayjs().isAfter(date, `D`) ? false : dayjs().isBefore(date, `D`);
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const sortByField = (field) => {
  return (a, b) => a[field] > b[field] ? 1 : -1;
};
