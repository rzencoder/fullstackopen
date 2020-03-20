import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value} {text === "positive:" ? "%" : ""}
    </p>
  );
};

export default Statistic;
