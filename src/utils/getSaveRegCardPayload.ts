import moment from 'moment';

import {RootState} from "../reduxStore/store";
import NewPatientPayload from "../interfaces/payloads/patients/newPatient";

export const getSaveRegCardPayload = (state: RootState): NewPatientPayload => {
  const {
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
    // hasImplants,
    // hasProsthesis,
    // docPersonId,
    // startCardDate,
    // hasCard,
    // onlyTempRegistration
  } = state.registrationCard.form.personal;
  const {trustedDoc} = state.registrationCard.form.socialStatus;
  const {directLinks, backLinks} = state.registrationCard.form.links;
  return {
    firstName,
    lastName,
    patrName,
    birthPlace,
    birthDate: moment(birthDate).format('YYYY-MM-DD'),
    birthTime,
    // ...hasImplants && {hasImplants},
    // ...hasProsthesis && {hasProsthesis},
    // ...docPersonId && {docPersonId},
    // ...startCardDate && {startCardDate},
    // ...hasCard && {hasCard},
    // ...onlyTempRegistration && {onlyTempRegistration},
    sex: sex === 0 ? 1 : 2,
    SNILS: snils.replace(/-|\s+/g,""),
    weight: weight.toString(),
    growth: height.toString(),

    client_document_info: [
      ...trustedDoc.map((item) => ({
        documentType_id: item.type,
        serial: item.serialFirst.concat(item.serialSecond),
        number: item.number,
        date: moment(item.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        origin: item.givenBy,
        endDate: '2200-12-12',
      })),
      {
        documentType_id: passportType,
        serial: serialFirst.concat(serialSecond),
        number,
        date: moment(fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        origin: givenBy,
        endDate: '2200-12-12',
      }
    ],

    client_contact_info: state.registrationCard.form.passportGeneral.contacts.map((item) => ({
      contactType_id: parseInt(item.type),
      contact: item.number,
      isPrimary: item.isMain ? 1 : 0,
      notes: item.note
    })),

    client_policy_info: [
      {
        insurer_id: parseInt(policyOms.cmo),
        policyType_id: policyOms.type ? parseInt(policyOms.type) : null,
        policyKind_id: policyOms.timeType ? parseInt(policyOms.timeType) : null,
        begDate: moment(policyOms.from, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        endDate: moment(policyOms.to, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        note: policyOms.note,
        name: policyOms.name,
        number: policyOms.number,
        serial: policyOms.serial,
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
        isVillager: +!addressRegistration.isKLADR,
        type: 0,
      },
      {
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
        isVillager: +!documentedAddress.isKLADR,
        type: 1,
      },
    ],

    client_soc_status_info:
      state.registrationCard.form.socialStatus.socialStatus.map((item) => ({
        socStatusType_id: item.type ? parseInt(item.type) : null,
        socStatusClass_id: item.class ? parseInt(item.class) : null,
        begDate: moment(item.fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        endDate: moment(item.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        notes: item.note ?? '',
      })),

    client_relation_info: [
      ...directLinks.map((item) => ({
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink)
      })),
      ...backLinks.map((item) => ({
        relativeType_id: parseInt(item.forwardRef),
        relative_id: parseInt(item.patientLink)
      }))
    ],

    client_work_info: state.registrationCard.form.employment.employment.map((item) => ({
      org_id: parseInt(item.organization),
      post: item.position,
      stage: item.experience,
      client_work_hurt_info: state.registrationCard.form.employment.hazardHistory.map((item) => ({
        hurtType_id: parseInt(item.hazardDescription),
        stage: item.hazardExp
      })),
      client_work_hurt_factor_info: state.registrationCard.form.employment.hazardHistory.map((item) => ({
        factorType_id: parseInt(item.factor)
      }))
    })),

    client_attach_info: state.registrationCard.form.attachments.attachments.map(
      (item) => ({
        LPU_id: parseInt(item.lpu),
        attachType_id: parseInt(item.type),
        begDate: moment(item.fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        orgStructure_id: parseInt(item.unit),
        reason: 0
      }),
    ),

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
    // ...(state.registrationCard.form.outsideIdentification.outsideIds.length > 0) && {
    //   client_outside_identification: state.registrationCard.form.outsideIdentification.outsideIds.map(
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
