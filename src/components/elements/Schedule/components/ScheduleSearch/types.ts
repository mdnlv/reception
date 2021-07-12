import { PersonTree } from "../../types";

export type SearchHeaderProps = {
  onOpenSearch?(): void;
  title?: string;
  onCloseClick?(): void;
  onSearchButtonClick?(query: string): void;
  onTableModeChange(mode: 'default' | 'search'): void;
  mode: string;
  onSubmitForm?(): void;
  onClearSearch?(): void;
  searchCount?: number;
  className?: string;
  person_tree: PersonTree;
  setShowEmpty(arg:boolean): void;
  showEmpty: boolean;
  groupBy: 'speciality_id' | 'orgStructure_id';
  setGroupBy(arg: 'speciality_id' | 'orgStructure_id'): void;
  setFilter(arg: any): void;
  filter: any;
};
