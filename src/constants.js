import dayjs from 'dayjs';

export const SHOW_TIME = 5000;
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const BAR_HEIGHT = 55;

export const TimeFormat = {
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

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const BLANK_TRIP = {
  start: dayjs(),
  end: dayjs(),
  type: `taxi`,
  offers: {
    titles: [],
    prices: []
  },
  cost: 100,
  destination: {
    city: ``,
    descriptions: [],
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
