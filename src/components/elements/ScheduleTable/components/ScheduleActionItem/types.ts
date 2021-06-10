import { ScheduleTableDate, ScheduleListTicket, ScheduleTableModeType } from "../../types";
import { ActionData } from "../../types"

export interface ItemProps {
  info?: ScheduleTableDate  | null ;
  ticket?:  ScheduleListTicket | null ;
  width: number;
  mode: ScheduleTableModeType;
  onModeChange(mode: ScheduleTableModeType): void;
  setDay(date?: Date): void;
  date? : Date | undefined;
  showModal?(data: ActionData): void;
  person?: {
    fullName: string;
    id: number;
    speciality: string;
    org: number;
  };
  client? : {
    fullName: string;
    id: number;
  };
  orgId?: number;
}
