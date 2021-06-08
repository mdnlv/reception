import DeferredCall from "../../../types/data/DeferredCall";

export interface DeferredCallsState {
  queue: DeferredCall[],
  loading: boolean
  patientList: [],
  doctors: [],
  specialty: [],
  josForm:{
    date: Date | null,
    patient:{
        id: string,
    },
    doctor:{
      id: string,
  },
  organisation:{
    id:string
},
  specialty:{
  id:string
  }
    }
}
