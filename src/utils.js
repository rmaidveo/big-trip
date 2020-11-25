import dayjs from "dayjs";
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isTripPlanned = (date) => {
  return dayjs().isBefore(date, `D`) ? false : dayjs().isAfter(date, `D`);
};

export const isTripExpired = (date) => {
  return dayjs().isAfter(date, `D`) ? false : dayjs().isBefore(date, `D`);
};
