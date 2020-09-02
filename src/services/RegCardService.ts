import apiInstance from "./api";
import {AxiosResponse} from "axios";


export default {
    fetchRegCard(): Promise<AxiosResponse<any>>{
        return apiInstance.get('/')
    }
}
