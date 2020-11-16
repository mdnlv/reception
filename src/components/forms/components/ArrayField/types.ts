export type FieldProps<T> = {
  fieldName: string;
  renderChild: (key: string, index: number) => JSX.Element;
};
