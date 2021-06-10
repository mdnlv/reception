import DeferredCall from "../../../types/data/DeferredCall";

export interface DeferredCallsState {
  queue: DeferredCall[],
  loading: boolean
  patientList: [],
  doctors: [],
  specialty: [],
  filteredDoctors: [],
  josForm:{
    date: Date | null,
    patient:string,
    doctor:string,
    organisation:string,
    specialty:string,
    сomment: string,
}
}
