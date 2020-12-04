import dayjs from "dayjs";
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

export const sortByField = (field) => {
  return (a, b) => b[field] > a[field] ? 1 : -1;
};
