import {ScheduleTableModeType} from "../../../../types";

export interface ItemProps {
  mode: ScheduleTableModeType;
  value: number | string;
  dayName?: string;
}
