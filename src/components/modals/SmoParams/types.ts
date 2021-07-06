export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  policyKey: 'policyOms' | 'policyDms';
  getKladrDetailed(): JSX.Element[];
}
