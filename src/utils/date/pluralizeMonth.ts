export const getPluralizeName = (name: string) => {
  switch (name) {
    case 'январь':
      return 'января';
    case 'февраль':
      return 'февраля';
    case 'март':
      return 'марта';
    case 'апрель':
      return 'апреля';
    case 'май':
      return 'мая';
    case 'июнь':
      return 'июня';
    case 'июль':
      return 'июля';
    case 'август':
      return 'августа';
    case 'сентябрь':
      return 'сентября';
    case 'октябрь':
      return 'октября';
    case 'ноябрь':
      return 'ноября';
    case 'декабрь':
      return 'декабря';
  }
};
