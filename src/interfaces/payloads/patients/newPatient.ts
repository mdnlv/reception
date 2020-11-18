export default interface NewPatientPayload {
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  birthTime: string | null;
  sex: 1 | 2;
  SNILS: string;
  growth: string;
  weight: string;
  birthPlace: string;

  social_status_info: {
    type: number | null;
    class: number | null;
    begDate: string;
    endDate: string;
    notes: string | null;
  }[];

  client_document_info: {
    documentType_id: string;
    serial: string;
    number: string;
    date: string;
    endDate: string;
    origin: string;
  };

  client_address_info?: {
    address: {
      address_house: {
        KLADRCode: string;
        KLADRStreetCode: string;
        number: string;
        corpus: string;
        litera: string;
      };
      flat: string;
    };
    type: number;
  }[];
}
