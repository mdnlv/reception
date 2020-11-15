import React from "react";

export interface WrapperProps {
  name: string;
  values: [];
  renderChild: (item: any, index: number) => React.ReactNode;
  onAddItem?(): void;
  onRemoveItem?(): void;
  showActions?: boolean;
}
