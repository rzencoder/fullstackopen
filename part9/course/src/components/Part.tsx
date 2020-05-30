import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<CoursePart> = (part) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <p>
                    {part.name} {part.description} {part.exerciseCount}
                </p>
            );
        case "Using props to pass data":
            return (
                <p>
                    {part.name} {part.groupProjectCount} {part.exerciseCount}
                </p>
            );
        case "Deeper type usage":
            return (
                <p>
                    {part.name} {part.description} {part.exerciseSubmissionLink}
                    {part.exerciseCount}
                </p>
            );
        case "Own attempt":
            return (
                <p>
                    {part.name} {part.description} {part.exerciseCount}
                </p>
            );
    }
};

export default Part;