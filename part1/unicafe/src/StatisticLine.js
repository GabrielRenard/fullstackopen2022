import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>
          <p>
            {text} {value}
          </p>
        </td>
      </tr>
    </>
  );
};

export default StatisticLine;
