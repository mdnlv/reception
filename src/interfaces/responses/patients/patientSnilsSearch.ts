export default interface PatientSnilsSearchResponse {
  pageNumber: number;
  pagesCount: number;
  patients: [
    {
      AddressFias: string;
      AddressReal: string;
      AddressReg: string;
      BirthDate: string;
      BirthPlace: string;
      CitizenShip: string;
      Education: string;
      Email: string;
      FirstName: string;
      FirstNameOld: string;
      InformationNewborn: string;
      InvGroup: string;
      LastName: string;
      LastNameOld: string;
      MartialStatus: string;
      MiddleName: string;
      MiddleNameOld: string;
      Nationality: string;
      PatientId: number;
      PatientIdentity: [
        {
          DocumentNumber: string;
          DocumentSeries: string;
          DocumentType: {
            $: string;
            "@version": string;
          };
          IssueDate: string;
          Issuer: string;
          expirationDate: string;
        }
      ];
      Phone: string;
      Policy: string;
      Privileges: number[];
      Sex: {
        $: number;
        "@version": string;
      };
      ShiftWorker: string;
      SnilsMissingReason: string;
      SocialStatus: number[];
      Workplace: string;
      guid: string;
      mcod: string;
      snils: string;
    }
  ];
}
