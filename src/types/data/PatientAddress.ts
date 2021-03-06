export default interface PatientAddress {
  id: number;
  addressId: number | null;
  freeInput: string;
  districtId: number | null;
  type: number;

  address: {
    id: number;
    KLADRCode?: string;
    KLADRStreetCode?: string;
    house?: string;
    corpus?: string;
    litera?: string;
    flat?: string;
  };
}
