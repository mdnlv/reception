export type FieldProps<T> = {
  values: T[];
  name: string;
  renderChild: (key: string, index: number) => JSX.Element;
};
