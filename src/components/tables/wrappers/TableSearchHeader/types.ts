export type SearchHeaderProps = {
  title?: string;
  onSearchButtonClick?(query: string): void;
  onSubmitForm?(): void;
  onClearSearch?(): void;
  searchCount?: number;
  className?: string;
  onSearchQuery?(value: string): void;
  searchQuery?: string;
};
