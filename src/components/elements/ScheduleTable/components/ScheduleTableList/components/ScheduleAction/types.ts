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
  actionTicket(data: ActionPost): void;
  setOldData(date?: ActionData): void;
  postLoading: boolean;
  edit: boolean;
  setPacient(arg: string): void;
  speciality: {
    [k: number]: string;
  };
  post: Post[];
}

export interface ActionData {
  date: string;
  time: string;
  client: string;
  person: string;
  speciality: string;
  type: string;
  data: ActionPost;
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
  type: 'edit' | 'new' | 'delete';
}
  