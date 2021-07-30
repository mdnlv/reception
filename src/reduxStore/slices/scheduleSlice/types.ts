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

export interface Ticket {
  office: string;
  date: string;
  time: number;
  person: string;
  actionData: ActionData
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
  orgs: number[];
}
  
export interface ActionPost {
  action_id: number;
  idx: number;
  client_id: number;
  person_id: number;
  user_id: number;
  index: string;
  old_action_id: number;
  old_idx: number;
  type: 'edit' | 'new' | 'delete' | 'show';
}
