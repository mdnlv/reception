type FindPolicyParams = Partial<{
  birthDate: string | Date;
  docSerial: string;
  docNumber: string;
  firstName: string;
  lastName: string;
  patrName: string;
  policyNumber: string;
  policySerial: string;
  sex: string;
}>;

export default FindPolicyParams;
