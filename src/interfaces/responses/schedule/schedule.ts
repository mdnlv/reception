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
  };
  year: number;
}
