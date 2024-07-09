export type Icons =
  | "arrow-down-thin"
  | "arrow-up-thin"
  | "chevron-double-left"
  | "chevron-double-right"
  | "chevron-left"
  | "chevron-right";

export interface IconProps {
  icon: Icons;
  rotation?: number | string;
}
