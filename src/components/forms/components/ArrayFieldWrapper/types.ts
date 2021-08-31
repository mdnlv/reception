import React from "react";

export interface WrapperProps<T> {
  name: string;
  values: T[];
  renderChild: (item: T, index: number) => React.ReactNode;
  onAddItem?(type?:string): void;
  showActions?: boolean;
  extraDeps?: any[];
}
