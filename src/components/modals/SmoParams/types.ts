export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  onCancel?(): void;
  policyKey: 'policyOms' | 'policyDms';
  getKladrDetailed(): JSX.Element[];
}
