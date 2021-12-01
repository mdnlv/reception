import {format} from "date-fns";

import {RootState} from "../reduxStore/store";
import NewPatientPayload from "../interfaces/payloads/patients/newPatient";
import {toServerFormat} from "./date/toServerFormat";
import PatientRelation from "../interfaces/payloads/regCard/PatientRelation";
import PatientContact from "../interfaces/payloads/regCard/PatientContact";
import PatientDocument from "../interfaces/payloads/regCard/PatientDocument";
import PatientAttach from "../interfaces/payloads/regCard/PatientAttach";
import PatientSocStatus from "../interfaces/payloads/regCard/PatientSocStatus";

export const getSaveRegCardPayload = (state: RootState): NewPatientPayload => {
  const {
    addressRegistration,
    documentedAddress,
  } = state.registrationCard.form.passportGeneral.passportInfo;
  const {
    documents,
    policies,
  } = state.registrationCard.form.personDocs;
  const {
    code,
    firstName,
    lastName,
    patrName,
    birthDate,
    birthTime,
    weight,
    height,
    sex,
    snils,
    SNILSMissingReason,
    birthPlace,
    isShiftWorker
  } = state.registrationCard.form.personal;
  const {directLinks, backLinks} = state.registrationCard.form.links;
  const {socialStatus} = state.registrationCard.form;
  const {isUnknown, isOperator} = state.registrationCard.form;
  const isShiftWorkerStatus = state.registrationCard.form.socialStatus.socialStatus.find(
    (item) => item.class === '51' && item.statusType === '925'
  );
  return {
    ...(code && {id: parseInt(code)}),
    firstName,
    lastName,
    patrName,
    birthPlace,
    birthDate: typeof birthDate !== 'string' ? toServerFormat(birthDate) : birthDate,
    ...(birthTime && {birthTime}),
    sex: sex === 0 ? 1 : sex !== null ? 2 : null,
    ...(!parseInt(SNILSMissingReason)
          && {
                SNILS: snils.replace(/-|\s+/g, "") != ""
                  ? snils.replace(/-|\s+/g, "")
                  : undefined
             }),
    SNILSMissing_id: parseInt(SNILSMissingReason) || null,
    weight: weight.toString(),
    growth: height.toString(),
    client_is_vaht: isShiftWorker || isShiftWorkerStatus ? 1 : 0,
    sanity_check: isUnknown || isOperator ? 1 : 0,

    //@ts-ignore
    client_document_info: [
      ...documents.map((item) => ({
        ...(item.id && {id: item.id}),
        documentType_id: parseInt(item.passportType),
        ...((item.serialFirst?.trim() || item.serialSecond?.trim())
              && {serial: `${item.serialFirst?.trim()} ${item.serialSecond.trim()}`}),
        number: item.number || '',
        date: toServerFormat(item.fromDate),
        origin: item.givenBy || '',
        endDate: '2200-12-12',
      }))
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

    //@ts-ignore
    client_policy_info: [
      ...policies.map((item) => ({
        ...(item.id && {id: item.id}),
        insurer_id: parseInt(item.cmo),
        policyType_id: item.type ? parseInt(item.type) : null,
        policyKind_id: item.timeType ? parseInt(item.timeType) : null,
        begDate: typeof item.from === 'string' ? item.from : toServerFormat(item.from),
        endDate: typeof item.to === 'string' ? item.to : toServerFormat(item.to),
        note: item.note ? item.note : '',
        name: item.name ? item.name : '',
        number: item.number,
        serial: item.serial,
        insuranceArea: item.cmoArea,
        deleted: 0 as 0,
        enp: item.enp,
        ...(item.cancelReason && {discharge_id: parseInt(item.cancelReason)}),
      }))
    ],

    client_address_info: [
      {
        ...(addressRegistration.id && {id: addressRegistration.id}),
        ...(!addressRegistration.freeInput && {
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
          }
        }),
        isVillager: addressRegistration.isVillager ? +addressRegistration.isVillager as 0 | 1 : 0 as 0,
        isIdenticalAddresses: addressRegistration.isDocumentedAddress ? 1 : 0,
        freeInput: !addressRegistration.isKLADR ? addressRegistration.freeInput : '',
        type: 0,
      },
      ...(!state.registrationCard.form.passportGeneral.passportInfo.addressRegistration.isDocumentedAddress ? [{
        ...(documentedAddress.id && {id: documentedAddress.id}),
        ...(!documentedAddress.freeInput && {
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
          }
        }),
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
        ...(code && {relative_id: parseInt(code)}),
        client_id: item.forwardRef,
        deleted: 0 as 0,
      })),
      ...backLinks.deleted.reduce((res: PatientRelation[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            relativeType_id: parseInt(item.patientLink),
            ...(code && {relative_id: parseInt(code)}),
            client_id: item.forwardRef,
            deleted: 1 as 1,
          })
        }
        return res;
      }, []),
    ],

    //@ts-ignore
    client_attach_info: [
      ...state.registrationCard.form.attachments.attachments.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          ...(item.lpu && {LPU_id: parseInt(item.lpu)}),
          attachType_id: parseInt(item.type),
          //@ts-ignore
          begDate: item.fromDate ? item.fromDate instanceof Date ? format(item.fromDate, 'yyyy-MM-dd') : item.fromDate : '',
          //@ts-ignore
          endDate: item.endDate ? item.endDate instanceof Date ? format(item.endDate, 'yyyy-MM-dd') : item.endDate : undefined,
          ...(item.unit && {orgStructure_id: item.unit}),
          detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
          deleted: 0 as 0,
        }),
      ),
      ...state.registrationCard.form.attachments.deleted.reduce((res: PatientAttach[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            ...(item.lpu && {LPU_id: parseInt(item.lpu)}),
            attachType_id: parseInt(item.type),
            //@ts-ignore
            begDate: item.fromDate ? item.fromDate instanceof Date ? format(item.fromDate, 'yyyy-MM-dd') : item.fromDate : '',
            //@ts-ignore
            endDate: item.endDate ? item.endDate instanceof Date ? format(item.endDate, 'yyyy-MM-dd') : item.endDate : undefined,
            //@ts-ignore
            ...(item.unit && {orgStructure_id: item.unit}),
            detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
            deleted: 1 as 1,
          })
        }
        return res;
      }, []),
    ],

    //@ts-ignore
    client_soc_status_info: [
      ...socialStatus.socialStatus.map((item) => ({
        ...(item.id && {id: item.id}),
        ...(item.document.id && {document_id: item.document.id}),
        ...(item.statusType && {socStatusType_id: parseInt(item.statusType)}),
        socStatusClass_id: item.class ? parseInt(item.class) : '1',
        ...(item.fromDate && {begDate: toServerFormat(item.fromDate)}),
        ...(item.endDate && {endDate: toServerFormat(item.endDate)}),
        notes: item.note || '',
        deleted: 0 as 0,
        ...(item.document.passportType && {
          document: {
            ...(item.document.id && {id: item.document.id}),
            documentType_id: parseInt(item.document.passportType || ''),
            serial: item.document.serialFirst?.trim().concat(` ${item.document.serialSecond.trim()}` || '') || '',
            number: item.document.number || '',
            origin: item.document.givenBy || '',
            date: item.document.fromDate ? format(item.document.fromDate, 'yyyy-MM-dd') : '',
          }
        }),
      })),
      ...socialStatus.deleted.reduce((res: PatientSocStatus[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            ...(item.statusType && {socStatusType_id: parseInt(item.statusType)}),
            socStatusClass_id: item.class ? parseInt(item.class) : '1',
            ...(item.fromDate && {begDate: toServerFormat(item.fromDate)}),
            ...(item.endDate && {endDate: toServerFormat(item.endDate)}),
            notes: item.note || '',
            deleted: 1 as 1,
            ...(item.docType && {
              ...(item.docId && {id: item.docId}),
              documentType_id: parseInt(item.docType || ''),
              serial: item.serialFirst?.trim().concat(` ${item.serialSecond.trim()}` || '') || '',
              number: item.number || '',
              origin: item.givenBy || '',
              date: item.date ? format(item.date, 'yyyy-MM-dd') : '',
            }),
          })
        }
        return res;
      }, []),
    ],
  };
};
