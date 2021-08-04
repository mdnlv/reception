import {ActionPost, Schedule, ScheduleTableModeType} from "../../types";

export interface ListProps {
  isLoading: boolean;
  list: Schedule;
  onToggleRow(id: number, person_ids: number[]): void;
  selected: number[];
  selectedPerson: number[];
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  person_tree: PersonTree[];
  loadSchedule(id: number[], beg_date: string, end_date: string, showEmpty: boolean): void;
  currentDate: Date;
  rangeWeekDate: Date;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  speciality: {
    [k: number]: string;
  };
  actionTicket(data: ActionPost, id: number[], beg_date: string, end_date: string): void;
  setCurrentDay(date: Date): void;
  currentDay? : Date | undefined;
  showEmpty: boolean;
  groupBy: 'speciality_id' | 'orgStructure_id';
  setGroupBy(arg: 'speciality_id' | 'orgStructure_id'): void;
  setSelected(arg: number[]): void;
  searchCount?: number;
  clientTableType: 'pre' | 'post';
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
