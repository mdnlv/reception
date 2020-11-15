import {ActionItems, ScheduleTableModeType} from "../../types";

export interface RowProps {
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}
