import { PatientsSearchFiltersType } from '../../slices/patients/patientsSlice';
import PatientFiltersQueryPayload from '../../../interfaces/payloads/patients/patientFiltersQuery';
import cleanDeep from 'clean-deep';

export default function (
  filters: Partial<PatientsSearchFiltersType>,
): Partial<PatientFiltersQueryPayload> {
  const mappedFilters: Partial<PatientFiltersQueryPayload> = {
    clientExamPlanQuarter: filters.clientExamPlanQuarter,
    clientExamPlanYear: filters.clientExamPlanYear,
    begBirthDate: filters.begBirthDate,
    endBirthDate: filters.endBirthDate,
    begDateRPFConfirmed: filters.begDateRPFConfirmed,
    endDateRPFConfirmed: filters.endDateRPFConfirmed,
    isOncologyForm90: filters.isOncologyForm90,
    isAttachment: filters.isAttachment,
    isAttachNonBase: filters.isAttachNonBase,
    isClientExamPlan: filters.isClientExamPlan,
    identifier: filters.identifier,
    identifierSystemId: filters.identifierSystemId,
    isEmptyAddress: filters.isEmptyAddress,
    isRPFUnconfirmed: filters.isRPFUnconfirmed,
    tempInvalid_DocumentType_id: filters.tempInvalidDocumentTypeId,
    tempInvalid_Reason_id: filters.tempInvalidReasonId,
    tempInvalid_DocumentBegDate: filters.tempInvalidDocumentBegDate,
    tempInvalid_DocumentEndDate: filters.tempInvalidDocumentEndDate,
    tempInvalid_DocumentNumber: filters.tempInvalidDocumentNumber,
    tempInvalid_DocumentSerial: filters.tempInvalidDocumentSerial,
    modifyPerson_id: filters.modifyPersonId,
    createPerson_id: filters.createPersonId,
    areaType_id: filters.areaTypeId,
    areaOrgStructure_id: filters.areaOrgStructureId,
    bedProfileOrgStructure_id: filters.bedProfileOrgStructureId,
    bedProfileType_id: filters.bedProfileTypeId,
    attachmentCategory_id: filters.attachmentCategoryId,
    attachmentType_id: filters.attachmentTypeId,
    attachmentOrganisation_id: filters.attachmentOrganisationId,
    clientExamPlanKind_id: filters.clientExamPlanKindId,
  };

  const clearFilters = cleanDeep(mappedFilters);

  return clearFilters;
}
