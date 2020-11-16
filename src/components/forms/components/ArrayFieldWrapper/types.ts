import React from "react";

export interface WrapperProps<T> {
  name: string;
  values: T[];
  renderChild: (item: T, index: number) => React.ReactNode;
  onAddItem?(): void;
  onRemoveItem?(): void;
  showActions?: boolean;
}
