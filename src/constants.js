import dayjs from 'dayjs';

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
  OFFERS: `offers`,
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
  MAJOR: `MAJOR`,
  INIT: `INIT`
};
export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};
export const BAR_HEIGHT = 55;

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const BLANK_TRIP = {
  start: dayjs(),
  end: dayjs(),
  type: `taxi`,
  offers: {
    title: [],
    price: []
  },
  cost: 100,
  destination: {
    city: ``,
    description: [],
    photos: []
  },
  isFavorite: false
};
export const Structure = {
  TYPE: `type`,
  PLACE: `place`,
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export const SHOW_TIME = 5000;
