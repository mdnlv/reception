import {ActionPost, Schedule, ScheduleTableModeType} from "../../types";

export interface ListProps {
  isLoading: boolean;
  list: Schedule;
  onToggleRow(id: number): void;
  selected: number[];
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  person_tree: PersonTree[];
  loadSchedule(id: number[], beg_date: string, end_date: string): void;
  currentDate: Date;
  rangeWeekDate: Date;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  speciality: {
    [k: number]: string;
  };
  client : {
    fullName: string;
    id: number;
  },
  actionTicket(data: ActionPost): void;
  setCurrentDay(date: Date): void;
  currentDay? : Date | undefined;
}

export interface PersonTree {
  id: number;
  name: string;
  child: PersonTree[];
  person_list: Person[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  patrName: string;
}
