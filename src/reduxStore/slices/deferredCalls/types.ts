import DeferredCall from "../../../types/data/DeferredCall";

export interface DeferredCallsState {
  queue: DeferredCall[],
  loading: boolean
}
