interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourseDescription {
    description: string;
}

export interface CoursePartOne extends CoursePartBase, CourseDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase, CourseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export interface CoursePartOwn extends CoursePartBase, CourseDescription {
    name: "Own attempt";
}

export type CoursePart =
    | CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartOwn;

export interface CourseParts {
    courseParts: CoursePart[];
}