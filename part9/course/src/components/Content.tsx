import React from "react";
import Part from "./Part";
import { CoursePart, CourseParts } from "../types";

const Content: React.FC<CourseParts> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part: CoursePart) => (
                <div key={part.name}>
                    <Part {...part} />
                </div>
            ))}
        </div>
    );
};

export default Content;