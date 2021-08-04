export interface PatientTicketsProps {
  client_id: number;
  type: 'pre' | 'post';
  setType(arg: 'pre' | 'post'): void;
}
