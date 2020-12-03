import {AxiosResponse} from "axios";

import apiInstance from "./api";
import InfoItemResponse from "../interfaces/responses/infoBooks/InfoItemResponse";

export default {
    fetchAll(): Promise<AxiosResponse<InfoItemResponse[]>>{
        return apiInstance.get(`/refBooks/rbSpeciality`)
    }
}
