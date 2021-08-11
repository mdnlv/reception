export default interface PatientPolicySearchResponse {
  smoId: {
    id: number;
    shortName: string;
  };
  policySerial: string;
  enp: string;
  policyNumber: string;
  begDate: string;
  endDate: string;
  attach: string;
  attachList: number[];
  policyKindId: number;
}
