import {ScheduleTableModeType} from "../../../../types";

export interface PickerProps {
  current: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  onRangeWeekChange(date: Date): void;
  mode: ScheduleTableModeType;
  rangeWeekDate: Date;
}

export type DateMode = 'default' | 'detailed';
