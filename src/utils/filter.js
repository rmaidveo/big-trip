import {isTripPlanned, isTripExpired} from "../utils/trip.js";
import {FilterType} from "../constants.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events
    .filter((event) => isTripPlanned(event.start)),
  [FilterType.PAST]: (events) => events
    .filter((event) => isTripExpired(event.start))
};
