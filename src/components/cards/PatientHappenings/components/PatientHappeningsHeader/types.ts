export type HeaderProps = {
    selectedHappening?: number;
    uploadDoc(): void;
    onInputChange(query: string): void;
    searchQuery: string;
};
