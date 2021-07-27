import {ValidationType} from "../../forms/wizards/RegCardWizard/types";

export type ValidationModalProps = {
  isVisible: boolean;
  onClose?(): void;
  errors: ValidationType
  setActiveTab(value: string): void;
}
