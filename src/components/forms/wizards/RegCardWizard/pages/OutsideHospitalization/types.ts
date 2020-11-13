export interface PersonHospitalization {
  serialNumber: string;
  lpu: string;
  hospitalizationReason: string;
  arrivalDate: Date;
  departureDate: Date;
  mkb: string;
  diagnosis: string;
}

export default interface FormState {
  outsideHospitalization: PersonHospitalization[];
}
