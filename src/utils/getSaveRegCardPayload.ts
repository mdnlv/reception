import moment from 'moment';
import {format} from "date-fns";

import {RootState} from "../reduxStore/store";
import NewPatientPayload from "../interfaces/payloads/patients/newPatient";
import {toServerFormat} from "./date/toServerFormat";

export const getSaveRegCardPayload = (state: RootState): NewPatientPayload => {
  const {
    id,
    passportType,
    serialFirst,
    serialSecond,
    number,
    fromDate,
    givenBy,
    addressRegistration,
    documentedAddress,
  } = state.registrationCard.form.passportGeneral.passportInfo;
  const {
    // policyDms,
    policyOms,
  } = state.registrationCard.form.passportGeneral;
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
      // @ts-ignore
      ...socialStatus.socialStatus.map((item:{
        docType:any;
        serialFirst:any;
        serialSecond: any;
        number:any;
        date:any;
        givenBy:any;
        docId:any;
      }) => ({
        ...(item.docId && {id: item.docId}),
        documentType_id: item.docType,
        serial: item.serialFirst.concat(item.serialSecond),
        number: item.number,
        date: toServerFormat(item.date),
        origin: item.givenBy,
        endDate: '2200-12-12',
      })),
      {
        ...(id && {id}),
        documentType_id: passportType,
        serial: serialFirst?.concat(serialSecond),
        number,
        date: toServerFormat(fromDate),
        origin: givenBy,
        endDate: '2200-12-12',
      }
    ],

    client_contact_info: [
      ...state.registrationCard.form.passportGeneral.contacts.contacts.map((item) => ({
        ...(item.id && {id: item.id}),
        contactType_id: parseInt(item.type),
        contact: item.number,
        isPrimary: item.isMain ? 1 : 0,
        notes: item.note,
        deleted: 0,
      })),
      ...state.registrationCard.form.passportGeneral.contacts.deleted.map((item) => ({
        ...(item.id && {id: item.id}),
        contactType_id: parseInt(item.type),
        contact: item.number,
        isPrimary: item.isMain ? 1 : 0,
        notes: item.note,
        deleted: 1,
      })),
    ],

    client_policy_info: [
      {
        ...(policyOms.id && {id: policyOms.id}),
        insurer_id: parseInt(policyOms.cmo),
        policyType_id: policyOms.type ? parseInt(policyOms.type) : null,
        policyKind_id: policyOms.timeType ? parseInt(policyOms.timeType) : null,
        begDate: toServerFormat(policyOms.from),
        endDate: toServerFormat(policyOms.to),
        note: policyOms.note,
        name: policyOms.name,
        number: policyOms.number,
        serial: policyOms.serial,
        deleted: policyOms.deleted,
      }
    ],
      // policyDms.concat(policyOms).map((item) => ({
      //   insurer_id: parseInt(item.cmo),
      //   policyType_id: item.type ? parseInt(item.type) : null,
      //   policyKind_id: item.timeType ? parseInt(item.timeType) : null,
      //   begDate: item.from,
      //   endDate: item.to,
      //   note: item.note,
      //   name: item.name,
      //   number: item.number,
      //   serial: item.serial,
      // })) || [],

    client_address_info: [
      {
        ...(addressRegistration.id && {id: addressRegistration.id}),
        address: {
          address_house: {
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
          flat: addressRegistration.flatNumber?.toString() || '',
        },
        isVillager: +addressRegistration.isVillager,
        isIdenticalAddresses: addressRegistration.isDocumentedAddress ? 1 : 0,
        freeInput: addressRegistration.freeInput,
        type: 0,
      },
      ...(!state.registrationCard.form.passportGeneral.passportInfo.addressRegistration.isDocumentedAddress ? [{
        ...(documentedAddress.id && {id: documentedAddress.id}),
        address: {
          address_house: {
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
          flat: documentedAddress.flatNumber?.toString() || '',
        },
        isVillager: +documentedAddress.isVillager,
        freeInput: documentedAddress.freeInput,
        type: 1,
      }] : []),
    ],

    client_soc_status_info: [
      ...socialStatus.socialStatus.map((item) => ({
        ...(item.id && {id: item.id}),
        socStatusType_id: item.statusType ? parseInt(item.statusType) : null,
        socStatusClass_id: item.class ? parseInt(item.class) : null,
        begDate: toServerFormat(item.fromDate),
        endDate: toServerFormat(item.endDate),
        notes: item.note ?? '',
        deleted: 0 as 0,
      })),
      ...socialStatus.deleted.map((item) => ({
        ...(item.id && {id: item.id}),
        socStatusType_id: item.statusType ? parseInt(item.statusType) : null,
        socStatusClass_id: item.class ? parseInt(item.class) : null,
        begDate: toServerFormat(item.fromDate),
        endDate: toServerFormat(item.endDate),
        notes: item.note ?? '',
        deleted: 1 as 1,
      })),
    ],

    client_relation_info: [
      ...directLinks.directLinks.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink),
        deleted: 0,
      })),
      ...directLinks.deleted.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink),
        deleted: 1,
      })),
      ...backLinks.backLinks.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink),
        deleted: 0,
      })),
      ...backLinks.deleted.map((item) => ({
        ...(item.id && {id: item.id}),
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink),
        deleted: 1,
      })),
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
      ...state.registrationCard.form.employment.deleted.map((item) => ({
        ...(item.id && {id: item.id}),
        ...(item.organization && {org_id: parseInt(item.organization)}),
        post: item.position,
        stage: item.experience,
        freeInput: item.freeInput || "",
        client_work_hurt_info: item.hazardHistory.map((a) => ({
          ...(a.id && {id: a.id}),
          ...(a.master_id && {master_id: a.master_id}),
          hurtType_id: parseInt(a.hazardDescription),
          stage: a.hazardExp
        })),
        client_work_hurt_factor_info: item.hazardFactors.map((b) => ({
          ...(b.id && {id: b.id}),
          ...(b.master_id && {master_id: b.master_id}),
          factorType_id: parseInt(b.factor)
        })),
        deleted: 1 as 1,
      }))
    ],

    client_attach_info: [
      ...state.registrationCard.form.attachments.attachments.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          LPU_id: parseInt(item.lpu),
          attachType_id: parseInt(item.type),
          begDate: moment(item.fromDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
          orgStructure_id: parseInt(item.unit),
          detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
          deleted: 0 as 0,
        }),
      ),
      ...state.registrationCard.form.attachments.deleted.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          LPU_id: parseInt(item.lpu),
          attachType_id: parseInt(item.type),
          begDate: moment(item.fromDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
          orgStructure_id: parseInt(item.unit),
          detachment_id: item.detachmentReason ? parseInt(item.detachmentReason || '0') : null,
          deleted: 1 as 1,
        }),
      ),
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
      ...state.registrationCard.form.outsideIdentification.deleted.map(
        (item) => ({
          ...(item.id && {id: item.id}),
          accountingSystem_id: parseInt(item.outsideSchema),
          identifier: 'Да',
          checkDate: format(item.date, 'yyyy-MM-dd'),
          deleted: 1 as 1,
        })
      )
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
