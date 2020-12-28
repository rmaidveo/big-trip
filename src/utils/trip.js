import dayjs from "dayjs";

export const getAllCost = (cost, offers) => {
  let allcost = cost;
  for (let i = 0; i < offers.price.length; i++) {
    allcost += offers.price[i];
  }
  return allcost;
};

export const isTripPlanned = (date) => {
  return dayjs().isAfter(date, `D`) ? false : dayjs().isBefore(date, `D`);
};

export const isTripExpired = (date) => {
  return dayjs().isBefore(date, `D`) ? false : dayjs().isAfter(date, `D`);

};

export const sortByField = (field) => {
  return (a, b) => b[field] > a[field] ? 1 : -1;
};

export const sortByPrice = () => {
  return (a, b) => b[`total`] > a[`total`] ? 1 : -1;
};

export const sortByTime = () => {
  return (a, b) => b[`duration`] > a[`duration`] ? 1 : -1;
};

export const sortByDay = () => {
  return (a, b) => dayjs(a[`start`]).isAfter(b[`start`]) > dayjs(b[`start`]).isAfter(a[`start`]) ? 1 : -1;
};
