interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
// Use a discriminated union - kind delimiter and required props
export interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;
