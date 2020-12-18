import moment from 'moment';

export const toRusFormat = (value: string | undefined) => {
  return moment(value, "YYYY-MM-DD").format("DD.MM.YYYY")
}
