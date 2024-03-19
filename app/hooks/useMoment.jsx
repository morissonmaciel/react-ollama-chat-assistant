import moment from "moment";
import "moment/locale/pt-br";

export function useMoment(lang) {
  return [
    (() => {
      moment.locale(lang);
      return moment;
    })(),
  ];
}
