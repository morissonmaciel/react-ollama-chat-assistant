import moment from "moment";
import "moment/locale/pt-BR";

export function useMoment(lang) {
  return [
    (() => {
      moment.locale(lang);
      return moment;
    })(),
  ];
}
