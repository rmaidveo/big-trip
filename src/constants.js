export const TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];
export const CITIES = [
  `Tokyo`,
  `Oslo`,
  `Boston`,
  `Berlin`,
  `Osaka`,
  `Karaganda`,
  `Barcelona`,
  `Madrid`,
  `Lisbon`,
  `Riga`,
  `Kaliningrad`,
  `Morio`,
  `Konoha`
];
export const OFFERS = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Travel by train`,
  `Rent a car`,
  `Order Uber`
];

export const COST = {
  MIN: 100,
  MAX: 800
};

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
export const TIME_IN_MIN = {
  MAXMIN: 1440,
  DAY: 24,
  HOUR: 60
};

export const SortType = {
  DEFAULT: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFERS: `offers`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
