import {ScheduleOne, ScheduleTableModeType} from "../../types";
import { ActionData } from "../../types"
export interface RowProps {
  items: ScheduleOne;
  onNewScheduleItem(): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  currentDate: Date;
  rangeWeekDate: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  showModal?(data: ActionData): void;
  speciality: string;
  client : {
    fullName: string;
    id: number;
  };
}
