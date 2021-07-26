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
    sex: sex === 0 ? 1 : 2,
    SNILS: snils.replace(/-|\s+/g,""),
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
        begDate: toServerFormat(item.from),
        endDate: toServerFormat(item.to),
        note: item.note,
        name: item.name,
        number: item.number,
        serial: item.serial,
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

    //@ts-ignore
    client_soc_status_info: [
      ...socialStatus.socialStatus.map((item) => ({
        ...(item.id && {id: item.id}),
        ...(item.document.id && {document_id: item.document.id}),
        socStatusType_id: item.statusType ? parseInt(item.statusType) : null,
        socStatusClass_id: item.class ? parseInt(item.class) : null,
        begDate: toServerFormat(item.fromDate),
        endDate: toServerFormat(item.endDate),
        notes: item.note || '',
        deleted: 0 as 0,
        document: !(Object.keys(item.document).length === 0 && item.document.constructor === Object)
          ? {
            ...(item.document.id && {id: item.document.id}),
            documentType_id: parseInt(item.document.passportType || ''),
            serial: item.document.serialFirst?.concat(item.document.serialSecond || '') || '',
            number: item.document.number || '',
            origin: item.document.givenBy || '',
            date: item.document.fromDate ? format(item.document.fromDate, 'yyyy-MM-dd') : '',
          }
          : {}
      })),
      ...socialStatus.deleted.reduce((res: PatientSocStatus[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            socStatusType_id: item.statusType ? parseInt(item.statusType) : null,
            socStatusClass_id: item.class ? parseInt(item.class) : null,
            begDate: toServerFormat(item.fromDate),
            endDate: toServerFormat(item.endDate),
            notes: item.note || '',
            deleted: 1 as 1,
            document: item.docType
              ? {
                ...(item.docId && {id: item.docId}),
                documentType_id: parseInt(item.docType || ''),
                serial: item.serialFirst?.concat(item.serialSecond || '') || '',
                number: item.number || '',
                origin: item.givenBy || '',
                date: item.date ? format(item.date, 'yyyy-MM-dd') : '',
              }
              : {}
          })
        }
        return res;
      }, []),
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

    client_work_info: [
      ...state.registrationCard.form.employment.employment.map((item) => ({
        ...(item.id && {id: item.id}),
        ...(item.organization && {org_id: parseInt(item.organization)}),
        post: item.position,
        stage: item.experience,
        freeInput: item.freeInput || "",
        client_work_hurt_info: item.hazardHistory.map((a) => ({
          ...(item.id && {master_id: item.id}),
          ...(a.id && {id: a.id}),
          hurtType_id: parseInt(a.hazardDescription),
          stage: a.hazardExp
        })),
        client_work_hurt_factor_info: item.hazardFactors.map((b) => ({
          ...(b.id && {id: b.id}),
          ...(item.id && {master_id: item.id}),
          factorType_id: parseInt(b.factor)
        })),
        deleted: 0 as 0,
      })),
      ...state.registrationCard.form.employment.deleted.reduce((res: PatientWork[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            ...(item.organization && {org_id: parseInt(item.organization)}),
            post: item.position,
            stage: item.experience,
            freeInput: item.freeInput || "",
            //@ts-ignore
            client_work_hurt_info: item.hazardHistory.map((a) => ({
              ...(item.id && {master_id: item.id}),
              ...(a.id && {id: a.id}),
              hurtType_id: parseInt(a.hazardDescription),
              stage: a.hazardExp
            })),
            //@ts-ignore
            client_work_hurt_factor_info: item.hazardFactors.map((b) => ({
              ...(b.id && {id: b.id}),
              ...(item.id && {master_id: item.id}),
              factorType_id: parseInt(b.factor)
            })),
            deleted: 1 as 1,
          })
        }
        return res;
      }, [])
    ],

    client_attach_info: [
      ...state.registrationCard.form.attachments.attachments.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          LPU_id: parseInt(item.lpu),
          attachType_id: parseInt(item.type),
          //@ts-ignore
          begDate: item.fromDate ? item.fromDate instanceof Date ? format(item.fromDate, 'yyyy-MM-dd') : item.fromDate : '',
          //@ts-ignore
          endDate: item.endDate ? item.endDate instanceof Date ? format(item.endDate, 'yyyy-MM-dd') : item.endDate : '',
          orgStructure_id: parseInt(item.unit),
          detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
          deleted: 0 as 0,
        }),
      ),
      ...state.registrationCard.form.attachments.deleted.reduce((res: PatientAttach[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            LPU_id: parseInt(item.lpu),
            attachType_id: parseInt(item.type),
            //@ts-ignore
            begDate: item.fromDate ? item.fromDate instanceof Date ? format(item.fromDate, 'yyyy-MM-dd') : item.fromDate : '',
            //@ts-ignore
            endDate: item.endDate ? item.endDate instanceof Date ? format(item.endDate, 'yyyy-MM-dd') : item.endDate : '',
            orgStructure_id: parseInt(item.unit),
            detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
            deleted: 1 as 1,
          })
        }
        return res;
      }, []),
    ],

    client_identification_info: [
      ...state.registrationCard.form.outsideIdentification.outsideIds.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          accountingSystem_id: parseInt(item.outsideSchema),
          identifier: 'Да',
          checkDate: format(item.date, 'yyyy-MM-dd'),
          deleted: 0 as 0,
        })
      ),
      ...state.registrationCard.form.outsideIdentification.deleted.reduce((res: PatientIdInfo[], item) => {
        if (item.id) {
          res.push({
            id: item.id,
            accountingSystem_id: parseInt(item.outsideSchema),
            identifier: 'Да',
            checkDate: format(item.date, 'yyyy-MM-dd'),
            deleted: 1 as 1,
          })
        }
        return res;
      }, [])
    ],

    // ...(state.registrationCard.form.outsideIdentification.outsideIds.length > 0) && {
    //   client_outside_identification: state.registrationCard.form.outsideIdentification.outsideIds.map(
    //     (item) => item,
    //   ),
    // },

    // ...(state.registrationCard.form.viewTypes.viewTypes.length > 0) && {
    //   client_view_types: state.registrationCard.form.viewTypes.viewTypes.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.features.features.length > 0) && {
    //   client_features: state.registrationCard.form.features.features.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.features.allergy.length > 0) && {
    //   client_allergy: state.registrationCard.form.features.allergy.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.features.medIntolerance.length > 0) && {
    //   client_med_intolerance: state.registrationCard.form.features.medIntolerance.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.features.inspections.length > 0) && {
    //   client_inspections: state.registrationCard.form.features.inspections.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.features.anthropometricDate.length > 0) && {
    //   client_anthropometric: state.registrationCard.form.features.anthropometricDate.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.privileges.privileges.length > 0) && {
    //   client_privileges: state.registrationCard.form.privileges.privileges.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.privileges.invalidity.length > 0) && {
    //   client_invalidity: state.registrationCard.form.privileges.invalidity.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.offences.offences.length > 0) && {
    //   client_offences: state.registrationCard.form.offences.offences.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.additionalHospitalization.hospitalizations.length > 0) && {
    //   client_additional_hospitalization: state.registrationCard.form.additionalHospitalization.hospitalizations.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.outsideHospitalization.outsideHospitalization.length > 0) && {
    //   client_outside_hospitalization: state.registrationCard.form.outsideHospitalization.outsideHospitalization.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.etc.items.length > 0) && {
    //   client_etc: state.registrationCard.form.etc.items.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.personDocs.idDoc.length > 0) && {
    //   client_id_doc: state.registrationCard.form.personDocs.idDoc.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.personDocs.policy.length > 0) && {
    //   client_policy: state.registrationCard.form.personDocs.policy.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.personDocs.socialStatus.length > 0) && {
    //   client_social_status: state.registrationCard.form.personDocs.socialStatus.map(
    //     (item) => item,
    //   ),
    // },
    // ...(state.registrationCard.form.personDocs.namedDoc.length > 0) && {
    //   client_named_doc: state.registrationCard.form.personDocs.namedDoc.map(
    //     (item) => item,
    //   ),
    // },
  };
};
