import { PersonTree } from "../../types";

export type SearchHeaderProps = {
  title?: string;
  onCloseClick?(): void;
  onSearchButtonClick?(query: string): void;
  onTableModeChange(mode: 'default' | 'search'): void;
  mode: string;
  onSubmitForm?(): void;
  onClearSearch?(): void;
  searchCount?: number;
  className?: string;
  setShowEmpty(arg:boolean): void;
  showEmpty: boolean;
  groupBy: 'speciality_id' | 'orgStructure_id';
  setGroupBy(arg: 'speciality_id' | 'orgStructure_id'): void;
  setFilter(arg: any): void;
  filter: any;
  setSelected(arg: number[]): void;
  setSelectedPerson(arg: number[]): void;
};
