import {AxiosResponse} from "axios";

import apiInstance from "./api";

export default {
    fetchRegCard(): Promise<AxiosResponse<any>>{
        return apiInstance.get('/')
    }
}
