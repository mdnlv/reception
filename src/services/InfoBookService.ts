import apiInstance from "./api";
import InfoItemResponse from "../interfaces/responses/infoBooks/InfoItemResponse";
import {AxiosResponse} from "axios";

export default {
    fetchAll(): Promise<AxiosResponse<InfoItemResponse[]>>{
        return apiInstance.get(`/refBooks/rbSpeciality`)
    }
}
