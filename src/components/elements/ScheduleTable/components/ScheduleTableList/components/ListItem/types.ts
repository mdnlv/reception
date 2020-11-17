import {ActionItems, ScheduleTableModeType} from "../../../../types";

export interface ItemProps {
  id: number;
  name: string;
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  toggle: boolean;
  onToggle(id: number): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}
