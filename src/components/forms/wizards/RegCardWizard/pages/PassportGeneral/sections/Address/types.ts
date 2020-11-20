import {KladrDocType} from "../../../../../../../../reduxStore/slices/registrationCard/types";

export interface KladrItem {
  id: string;
  name: string;
  socr: string;
}

export interface PrefixKladrItem extends KladrItem {
  prefix: string;
}

export interface SectionProps {
  passportType: 'addressRegistration' | 'documentedAddress';
  kladr: PrefixKladrItem[];
  nestedKladr: PrefixKladrItem[];
  kladrStreets: KladrItem[];
  isLoadingKladr: boolean;
  isLoadingKladrNested: boolean;
  isLoadingKladrStreets: boolean;
  getKladrNested(id: string, type: KladrDocType): void;
  getKladrStreets(id: string, type: KladrDocType): void;
  onCityBuffer(city: string): void;
  onStreetBuffer(street: string): void;
}
