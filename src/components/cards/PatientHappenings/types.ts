import DetailedPatientEvent from "../../../types/data/DetailedPatientEvent";

export default interface HappeningsProps {
    events: DetailedPatientEvent[];
    isLoading?: boolean;
}
