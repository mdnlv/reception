import Patient from "../types/data/Patient";
import KladrItem from "../types/data/KladrItem";
import KladrStreet from "../types/data/KladrStreet";

export const getAddress = (patient: Partial<Patient> | undefined, type: 0|1, kladr: KladrItem[], kladrStreets: KladrStreet[]) => {
  return (
    patient?.address?.find((item) => item.type === type)?.freeInput ||
    getKladrAddress(patient, type, kladr, kladrStreets)
  );
};

export const getKladrAddress = (patient: Partial<Patient> | undefined, type: 0|1, kladr: KladrItem[], kladrStreets: KladrStreet[]) => {
  const number = patient?.address?.find((item) => item.type === type)?.address
    .house;
  const corpus = patient?.address?.find((item) => item.type === type)?.address
    .corpus;
  const litera = patient?.address?.find((item) => item.type === type)?.address
    .litera;
  const flat = patient?.address?.find((item) => item.type === type)?.address
    .flat;
  let address = '';

  const kladrCode = patient?.address?.find((item) => item.type === type)
    ?.address.KLADRCode;
  const kladrStreetCode = patient?.address?.find((item) => item.type === type)
    ?.address.KLADRStreetCode;
  const kladrCity = kladr.find((item) => item.id === kladrCode);
  const kladrStreet = kladrStreets.find(
    (item) => item.id === kladrStreetCode,
  );
  const city = kladrCity?.name;
  const street = kladrStreet?.name;
  const socr = kladrStreet?.socr;

  if (city) {
    address = `г. ${city}`;
    if (street && socr) {
      address = address.concat(`, ${socr} ${street}`);
      if (number) {
        address = address.concat(`, д.${number}`);
        if (corpus) {
          address = address.concat(`, к.${corpus}`);
          if (litera) {
            address = address.concat(litera);
          }
        }
        if (flat) {
          address = address.concat(`, кв.${flat}`);
        }
      }
    }
  }

  return address;
};
