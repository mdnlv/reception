import { ScheduleTableDate, ScheduleListTicket, ScheduleTableModeType } from "../../types";
import { ActionData } from "../../types"

export interface ItemProps {
  //onClick?(): void;
  info?: ScheduleTableDate  | null ;
  ticket?:  ScheduleListTicket | null ;
  onNewScheduleItem(): void;
  width: number;
  mode: ScheduleTableModeType;
  onModeChange(mode: ScheduleTableModeType): void;
  onDateChange(date?: Date): void;
  date? : Date;
  showModal?(data: ActionData): void;
  person?: {
    fullName: string;
    id: number;
    speciality: string;
    orgStructure_id: number;
  };
  client? : {
    fullName: string;
    id: number;
  };
}
