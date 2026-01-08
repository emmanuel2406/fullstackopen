interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptiveBase extends CoursePartBase {
  description: string;
}

// Use a discriminated union - kind delimiter and required props
export interface CoursePartBasic extends CoursePartDescriptiveBase {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartDescriptiveBase {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartDescriptiveBase {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
