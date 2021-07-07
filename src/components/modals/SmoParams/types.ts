export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  onCancel?(): void;
  onOk?(): void;
  policyKey: 'policyOms' | 'policyDms';
  getKladrDetailed(): JSX.Element[];
}
