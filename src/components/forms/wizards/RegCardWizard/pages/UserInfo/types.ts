import {ValidationType} from "../../types";

export default interface UserInfoTypes {
  errors: ValidationType;
  onOpen(): void;
}
