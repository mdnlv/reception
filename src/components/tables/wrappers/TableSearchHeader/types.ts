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
};
