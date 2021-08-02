import {AxiosResponse} from "axios";
import DeferredCallsResponse from "../interfaces/responses/deferredCalls/deferredCalls";
import apiInstance from "./api";

export default {
    getDeferredCalls(token: string): Promise<AxiosResponse<DeferredCallsResponse[]>>{
        return apiInstance.get(
          '/deferredQueue?limit=10',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    },
    saveDeferredCall(token: string, query:any):Promise<AxiosResponse<[]>>{
        return apiInstance.post(
          '/deferredQueue',
          query,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
    }
}
