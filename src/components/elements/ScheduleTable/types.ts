export type ScheduleTableModeType = 'day' | 'week';

export interface ActionItems {
  [k: string]:
    | {
        name: string;
        clientId: number;
      }
    | undefined;
}

export interface ScheduleListItem {
  planned: number;
  id: number;
  personName: string;
  items: ActionItems;
}

export interface ScheduleTableSchedule {
  id: number;
  personName: string;
  planned: number;
  items: {
    [k: string]: {
      clientId: number;
      name: string;
    };
  };
}

export interface ScheduleTableProps {
  schedules: ScheduleTableSchedule[];
}
