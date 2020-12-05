import Patient from "../types/data/Patient";
import KladrItem from "../types/data/KladrItem";
import KladrStreet from "../types/data/KladrStreet";

export const getAddress = (patient: Patient, type: 0|1, kladrRegistration: KladrItem[], kladrStreetsRegistration: KladrStreet[]) => {
  return (
    patient?.address?.find((item) => item.type === type)?.freeInput ||
    getKladrAddress(patient, type, kladrRegistration, kladrStreetsRegistration)
  );
};

export const getKladrAddress = (patient: Patient, type: 0|1, kladrRegistration: KladrItem[], kladrStreetsRegistration: KladrStreet[]) => {
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
  const kladrCity = kladrRegistration.find((item) => item.id === kladrCode);
  const kladrStreet = kladrStreetsRegistration.find(
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