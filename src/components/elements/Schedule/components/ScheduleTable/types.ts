export type ScheduleTableModeType = 'day' | 'week';

export interface ScheduleClient {
  birthDate: string;
  firstName: string;
  id: number;
  lastName: string;
  patrName: string
  sex: number;
}

export interface ScheduleListTicket {
  action_id: number;
  planned: number;
  begDateTime: string;
  endDateTime: string;
  client: ScheduleClient;
  idx: number;
  index: string;
  status: string;
}

export interface ScheduleTableDate {  
  action_id: number;
  begTime: string;
  busy: boolean;
  endTime: string;
  office: string;
  planned: number;
  receptionTypeCode: string;
  roa: number;
  tickets: ScheduleListTicket[];
};

export interface ScheduleOne {
  person: any;
  schedule: {
    [k2: string]: ScheduleTableDate[];
  }
}

export interface ScheduleTable {
  [k1: number]: ScheduleOne;
}

export interface Schedule {
  [k1: number]: ScheduleTable;
}

export interface PersonTree {
  id: number;
  name: string;
  child: PersonTree[];
  person_list: Person[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  patrName: string;
}

export interface ScheduleTableProps {
  schedules: Schedule;
  person_tree: PersonTree[];
  loadSchedule(id: number[], beg_date: string, end_date: string, showEmpty: boolean): void;
  speciality: any,
  client: Client;
  actionTicket(data: ActionPost, id: number[], beg_date: string, end_date: string): void;
  showEmpty: boolean;
  groupBy: 'speciality_id' | 'orgStructure_id';
  selected: number[];
  selectedPerson: number[];
  onToggleScheduleRow(id: number, person_ids: number[]): void;
  setSelected(arg: number[]): void;
}

export interface Client {
  fullName: string;
  id: number;
}

export interface ActionProps {
  data: ActionData;
  visible: boolean;
  loading: boolean;
  handleOk(): void;
  handleCancel(): void;
}

export interface ActionData {
  date: string;
  time: string;
  client: string;
  person: string;
  speciality: string;
  type: string;
  data: ActionPost;
  org: number;
  tickets?: ScheduleListTicket[];
}

export interface ActionPost {
  action_id: number;
  idx: number
  old_action_id: number;
  old_idx: number;
  client_id: number;
  person_id: number;
  user_id: number;
  index?: string;
  type: 'edit' | 'new' | 'delete';
}