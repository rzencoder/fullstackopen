import React from 'react';
interface CourseParts {
    name: string;
    exerciseCount: number;
}

const Content: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(part => {
                return <p key={part.name}>{part.name} {part.exerciseCount}</p>
            })}
        </div>
    )
};

export default Content;