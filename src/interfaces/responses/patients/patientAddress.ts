export default interface AddressResponse {
  address: {
    address_house: {
      id: number;
      createDatetime: string;
      createPerson_id: number | null;
      modifyDatetime: string;
      modifyPerson_id: number | null;
      deleted: boolean;
      KLADRRegionCode?: string;
      KLADRCode?: string;
      KLADRStreetCode?: string;
      number?: string;
      corpus?: string;
      litera?: string;
    };
    createDatetime: string;
    createPerson_id: number | null;
    modifyDatetime: string;
    modifyPerson_id: number | null;
    deleted: 0 | 1;
    house_id: number | null;
    flat: string | null;
    regBegDate: string | null;
    regEndDate: string | null;
    id: number;
  };

  id: number;
  createDatetime: string;
  createPerson_id: number | null;
  modifyDatetime: string;
  modifyPerson_id: number | null;
  deleted: 0 | 1;
  client_id: number | null;
  type: number;
  address_id: number;
  freeInput: string;
  district_id: number | null;
  isVillager: 0 | 1;
}
