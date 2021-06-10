import {ScheduleOne, ScheduleTableModeType} from "../../types";
import { ActionData } from "../../types"
export interface RowProps {
  items: ScheduleOne;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  currentDate: Date;
  rangeWeekDate: Date;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  showModal?(data: ActionData): void;
  speciality: string;
  client : {
    fullName: string;
    id: number;
  };
  orgId: number;
  setCurrentDay(date?: Date): void;
  currentDay? : Date | undefined;
}
