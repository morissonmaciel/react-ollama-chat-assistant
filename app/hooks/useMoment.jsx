import moment from "moment";

export function useMoment(lang) {
  return [
    (() => {
      moment.locale(lang);
      return moment;
    })(),
  ];
}
