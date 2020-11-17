export interface InvalidArrayType {
  id: number;
  name: string;
}

export interface SectionProps {
  invalidReasons: InvalidArrayType[];
  invalidDocs: InvalidArrayType[];
}
