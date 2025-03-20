export interface DataItem {
  id: number;
  grade: string | number;
  name: string;
  character?: string;
  beforeImage?: string;
  image?: string;
  type: "identity" | "ego";
}
