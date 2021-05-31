export interface ActionProps {
    data?: ActionData;
    visible: boolean;
    loading: boolean;
    handleOk(data: ActionPost): void;
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
  }
  
  export interface ActionPost {
    action_id: number;
    idx: number;
    client_id: number;
    person_id: number;
    user_id: number;
    index: string;
  }