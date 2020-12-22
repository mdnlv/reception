import moment from 'moment';

export const toServerFormat = (value: string | undefined | Date) => {
  return moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')
}
