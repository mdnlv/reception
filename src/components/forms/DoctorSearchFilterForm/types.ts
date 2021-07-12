export interface FormProps {
  onClose?(): void;
  onClearForm?(): void;
  onSubmit?(): void;
  groupBy: 'speciality_id' | 'orgStructure_id';
  setFilter(arg: any): void;
}

