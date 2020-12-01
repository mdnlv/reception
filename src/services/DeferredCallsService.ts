import {AxiosResponse} from "axios";
import DeferredCallsResponse from "../interfaces/responses/deferredCalls/deferredCalls";
import apiInstance from "./api";

export default {
    getDeferredCalls(): Promise<AxiosResponse<DeferredCallsResponse[]>>{
        return apiInstance.get('/deferredQueue')
    }
}
