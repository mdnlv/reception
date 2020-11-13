import PatientResponse from '../patients/patient';

export interface ScheduleItemResponse {
  action_id: number;
  client_info: Omit<
    PatientResponse,
    | 'client_address_info'
    | 'client_document_info'
    | 'client_policy_info'
    | 'client_contact_info'
    | 'client_work_info'
  >;
}

export default interface ScheduleResponse {
  action_id: number;
  month: number;
  person_id: number;
  schedule: {
    availableForExternalSystem: 0 | 1;
    begTime: string;
    endTime: string;
    planned: number;
    receptionTypeCode: string;
    items: {
      [k: string]: ScheduleItemResponse;
    };
  };
  year: number;
}
