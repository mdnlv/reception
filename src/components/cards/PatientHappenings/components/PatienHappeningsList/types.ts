import DetailedPatientEvent from "../../../../../types/data/DetailedPatientEvent";

export type ListProps = {
    data: DetailedPatientEvent[];
    onSelect?(id: number): void;
    selectedItem?: number;
    isLoading?: boolean;
};
