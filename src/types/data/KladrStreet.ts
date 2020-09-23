import KladrItem from './KladrItem';

export default interface KladrStreet
  extends Pick<KladrItem, 'id' | 'name' | 'socr' | 'infis'> {}
