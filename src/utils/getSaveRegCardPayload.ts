import {format} from "date-fns";

import {RootState} from "../reduxStore/store";
import NewPatientPayload from "../interfaces/payloads/patients/newPatient";
import {toServerFormat} from "./date/toServerFormat";
import PatientRelation from "../interfaces/payloads/regCard/PatientRelation";
import PatientContact from "../interfaces/payloads/regCard/PatientContact";
import PatientSocStatus from "../interfaces/payloads/regCard/PatientSocStatus";
import PatientWork from "../interfaces/payloads/regCard/PatientWork";
import PatientAttach from "../interfaces/payloads/regCard/PatientAttach";
import PatientIdInfo from "../interfaces/payloads/regCard/PatientIdInfo";
import PatientDocument from "../interfaces/payloads/regCard/PatientDocument";

export const getSaveRegCardPayload = (state: RootState): NewPatientPayload => {
  const {
    addressRegistration,
    documentedAddress,
  } = state.registrationCard.form.passportGeneral.passportInfo;
  const {
    documents,
    documentsDeleted,
    policies,
    policiesDeleted
  } = state.registrationCard.form.personDocs;
  const {
    firstName,
    lastName,
    patrName,
    birthPlace,
    birthDate,
    birthTime,
    sex,
    snils,
    weight,
    height,
    startCardDate,
    code,
    // hasImplants,
    // hasProsthesis,
    // docPersonId,
    // hasCard,
    // onlyTempRegistration
  } = state.registrationCard.form.personal;
  const {socialStatus} = state.registrationCard.form;
  const {directLinks, backLinks} = state.registrationCard.form.links;
  return {
    ...(code && {id: parseInt(code)}),
    firstName,
    lastName,
    patrName,
    birthPlace,
    birthDate: typeof birthDate !== 'string' ? toServerFormat(birthDate) : birthDate,
    birthTime,
    chartBeginDate: startCardDate ? toServerFormat(startCardDate) : '',
    // ...hasImplants && {hasImplants},
    // ...hasProsthesis && {hasProsthesis},
    // ...docPersonId && {docPersonId},
    // ...hasCard && {hasCard},
    // ...onlyTempRegistration && {onlyTempRegistration},
    sex: sex === 0 ? 1 : sex !== null ? 2 : null,
    SNILS: snils.replace(/-|\s+/g, ""),
    weight: weight.toString(),
    growth: height.toString(),

    client_document_info: [
      ...documents.map((item) => ({
        ...(item.id && {id: item.id}),
        documentType_id: parseInt(item.passportType),
        serial: item.serialFirst?.concat(item.serialSecond) || '',
        number: item.number || '',
        date: toServerFormat(item.fromDate),
        origin: item.givenBy || '',
        endDate: '2200-12-12',
      })),
      ...documentsDeleted.reduce((res: PatientDocument[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            documentType_id: parseInt(item.passportType),
            serial: item.serialFirst?.concat(item.serialSecond) || '',
            number: item.number || '',
            date: toServerFormat(item.fromDate),
            origin: item.givenBy || '',
            endDate: '2200-12-12',
            deleted: 1 as 1,
          });
        }
        return res;
      }, []),
    ],

    client_contact_info: [
      ...state.registrationCard.form.passportGeneral.contacts.contacts.map((item) => ({
        ...(item.id && {id: item.id}),
        contactType_id: parseInt(item.type),
        contact: item.number,
        isPrimary: item.isMain ? 1 as 1 : 0 as 0,
        notes: item.note,
        deleted: 0 as 0,
      })),
      ...state.registrationCard.form.passportGeneral.contacts.deleted.reduce((res: PatientContact[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            contactType_id: parseInt(item.type),
            contact: item.number,
            isPrimary: item.isMain ? 1 as 1 : 0 as 0,
            notes: item.note,
            deleted: 1 as 1,
          })
        }
        return res;
      }, []),
    ],

    client_policy_info: [
      ...policies.map((item) => ({
        ...(item.id && {id: item.id}),
        insurer_id: parseInt(item.cmo),
        policyType_id: item.type ? parseInt(item.type) : null,
        policyKind_id: item.timeType ? parseInt(item.timeType) : null,
        begDate: typeof item.from === 'string' ? item.from : toServerFormat(item.from),
        endDate: typeof item.to === 'string' ? item.to : toServerFormat(item.to),
        note: item.note,
        name: item.name,
        number: item.number,
        serial: item.serial,
        insuranceArea: item.cmoArea,
        deleted: 0 as 0,
      })),
      ...policiesDeleted.map((item) => ({
        ...(item.id && {id: item.id}),
        insurer_id: parseInt(item.cmo),
        policyType_id: item.type ? parseInt(item.type) : null,
        policyKind_id: item.timeType ? parseInt(item.timeType) : null,
        begDate: toServerFormat(item.from),
        endDate: toServerFormat(item.to),
        note: item.note,
        name: item.name,
        number: item.number,
        serial: item.serial,
        insuranceArea: item.cmoArea,
        deleted: 1 as 1,
      }))
    ],

    client_address_info: [
      {
        ...(addressRegistration.id && {id: addressRegistration.id}),
        address: {
          address_house: {
            id: addressRegistration.addressHouseId,
            KLADRCode: (addressRegistration.area === '7800000000000'
              || addressRegistration.area === '7700000000000'
              || addressRegistration.area === '9200000000000')
              ? addressRegistration.area
              : addressRegistration.city,
            KLADRStreetCode: addressRegistration.street,
            number: addressRegistration.houseNumber?.toString() || '',
            corpus: '',
            litera: addressRegistration.houseCharacter?.toString() || '',
          },
          id: addressRegistration.addressId,
          house_id: addressRegistration.houseId,
          flat: addressRegistration.flatNumber?.toString() || '',
        },
        isVillager: addressRegistration.isVillager ? +addressRegistration.isVillager as 0 | 1 : 0 as 0,
        isIdenticalAddresses: addressRegistration.isDocumentedAddress ? 1 : 0,
        freeInput: !addressRegistration.isKLADR ? addressRegistration.freeInput : '',
        type: 0,
      },
      ...(!state.registrationCard.form.passportGeneral.passportInfo.addressRegistration.isDocumentedAddress ? [{
        ...(documentedAddress.id && {id: documentedAddress.id}),
        address: {
          address_house: {
            id: documentedAddress.addressHouseId,
            KLADRCode: (documentedAddress.area === '7800000000000'
              || documentedAddress.area === '7700000000000'
              || documentedAddress.area === '9200000000000')
              ? documentedAddress.area
              : documentedAddress.city,
            KLADRStreetCode: documentedAddress.street,
            litera: documentedAddress.houseCharacter?.toString() || '',
            corpus: '',
            number: documentedAddress.houseNumber?.toString() || '',
          },
          id: documentedAddress.addressId,
          house_id: documentedAddress.houseId,
          flat: documentedAddress.flatNumber?.toString() || '',
        },
        isVillager: documentedAddress.isVillager ? +documentedAddress.isVillager as 0 | 1 : 0 as 0,
        freeInput: !documentedAddress.isKLADR ? documentedAddress.freeInput : '',
        type: 1,
      }] : []),
    ],

    client_relation_info: [
      ...directLinks.directLinks.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.patientLink),
        relative_id: item.forwardRef,
        deleted: 0 as 0,
      })),
      ...directLinks.deleted.reduce((res: PatientRelation[], item) => {
        if (item.id) {
          res.push({
              id: item.id,
              relativeType_id: parseInt(item.patientLink),
              relative_id: item.forwardRef,
              deleted: 1 as 1,
          })
        }
        return res;
      }, []),
      ...backLinks.backLinks.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.patientLink),
        relative_id: item.forwardRef,
        client_id: item.forwardRef,
        deleted: 0 as 0,
      })),
      ...backLinks.deleted.reduce((res: PatientRelation[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            relativeType_id: parseInt(item.patientLink),
            relative_id: item.forwardRef,
            client_id: item.forwardRef,
            deleted: 1 as 1,
          })
        }
        return res;
      }, []),
    ],
  };
};
