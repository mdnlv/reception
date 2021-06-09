import {ScheduleTableModeType} from "../../../../types";

export interface PickerProps {
  current: Date;
  currentDay: Date;
  onDateChange(date?: Date, endDate?: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  mode: ScheduleTableModeType;
  length: string;
}

export type DateMode = 'default' | 'detailed';
