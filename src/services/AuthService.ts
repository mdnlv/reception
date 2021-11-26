import { AxiosResponse } from 'axios';

import apiInstance from './api';
import LoginPayload from "../interfaces/payloads/auth/LoginPayload";
import LoginResponse from "../interfaces/responses/auth/loginResponse";

export default {
  login(payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
    return apiInstance.post('auth/token', payload);
  }
}
