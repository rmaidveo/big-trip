import {SortType} from "../constants.js";

export const getRandomElement = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const sortsTypeOnMap = () => {
  return [{
    type: SortType.DEFAULT,
    name: `day`,
  },
  {
    type: SortType.EVENT,
    name: `event`,
  },
  {
    type: SortType.TIME,
    name: `time`,
  },
  {
    type: SortType.PRICE,
    name: `price`,
  },
  {
    type: SortType.OFFERS,
    name: `offers`,
  }
  ];
};

export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const isOnline = () => {
  return window.navigator.onLine;
};
