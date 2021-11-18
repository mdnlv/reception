import { ScheduleListTicket } from "../../../../types";

export interface Post {
  id: number;
  name: string;
};

export interface ActionProps {
  data: ActionData | undefined;
  oldData: ActionData | undefined;
  visible: boolean;
  loading: boolean;
  setVisible(arg: boolean): void;
  actionTicket(data: ActionPost, id: number): void;
  setOldData(date?: ActionData): void;
  postLoading: boolean;
  edit: boolean;
  setResult(arg: Result): void;
  speciality: {
    [k: number]: string;
  };
}

export interface Result {
  pacient: string,
  date: string,
  time: string,
  person: string,
  speciality: string
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
  idx: number;
  client_id: number;
  person_id: number;
  user_id: number;
  index: string;
  old_action_id: number;
  old_idx: number;
  type: 'edit' | 'new' | 'delete' | 'show';
}
