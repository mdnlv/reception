import {ScheduleTableModeType} from "../../types";

export interface HeaderProps {
  currentDate: Date;
  currentDay: Date;
  onDateChange(date: Date, endDate: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  mode: ScheduleTableModeType;
  length: string;
  setLength(l: string): void;
  selected: number[];
}
