import React from "react";

const Mytable = ({ rows, columns }) => {
  console.log("rows, columns", rows, columns);

  const rederCells = (rowIndex) => {
    return Array.from({ length: columns }, (_, columnIndex) => (
      <td key={`cell-${rowIndex}-${columnIndex}`} className="myTable-cell">
        {`R${rowIndex + 1}C${columnIndex + 1}`}
      </td>
    ));
  };

  const rederRows = () => {
    return Array.from({ length: rows }, (_, rowIndex) => (
      <tr key={`row-${rowIndex}`}>{rederCells(rowIndex)}</tr>
    ));
  };
  return (
    <table className="myTable">
      <tbody>{rederRows()}</tbody>
    </table>
  );
};

export default Mytable;
