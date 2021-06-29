import {ScheduleTableModeType} from "../../../../types";

export interface PickerProps {
  current: Date;
  currentDay: Date;
  onDateChange(date: Date, endDate: Date, s: number[]): void;
  onModeChange(mode: ScheduleTableModeType): void;
  mode: ScheduleTableModeType;
  length: string;
  selected: number[];
}

export type DateMode = 'default' | 'detailed';
