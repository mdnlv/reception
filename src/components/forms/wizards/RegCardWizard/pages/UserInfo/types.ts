import {ValidationType} from "../../types";
import {FormikErrors} from "formik";

export default interface UserInfoTypes {
  errors: FormikErrors<ValidationType>;
  onOpen(): void;
  fetchDoctors?: Function
}
