import { ScheduleTableDate, ScheduleListTicket, ScheduleTableModeType } from "../../types";

export interface ItemProps {
  //onClick?(): void;
  info?: ScheduleTableDate  | null ;
  tickets?:  ScheduleListTicket | null ;
  onNewScheduleItem(): void;
  width: number;
  mode: ScheduleTableModeType;
  onModeChange(mode: ScheduleTableModeType): void;
  onDateChange(date?: Date): void;
  date? : Date;
}
