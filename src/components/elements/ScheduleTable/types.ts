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
  loadSchedule(id: number, beg_date: string, end_date: string): void;
}
