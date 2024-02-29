import React, { useCallback, useState } from "react";

const columns = ["Isbn", "Title", "Author", "Year", "Publisher"];

const Table = props => {
  const { data } = props;
  const [sortedBy, setSortedBy] = useState(columns[0]);
  const [isAsc, setIsAsc] = useState(true);

  const sortData = useCallback(() => {
    const sortedData = data.sort((a, b) => {
      const x =
        a[sortedBy] === null ? "" : a[sortedBy].toString().trim().toLowerCase();
      const y =
        b[sortedBy] === null ? "" : b[sortedBy].toString().trim().toLowerCase();
      return x > y ? 1 : -1;
    });
    return isAsc ? sortedData : sortedData.reverse();
  }, [sortedBy, isAsc]);

  const SortSpan = props => {
    const { column } = props;
    const symbol = () => {
      if (column !== sortedBy) return "▽";
      if (isAsc) return "▼";
      return "▲";
    };
    return (
      <span
        className="cursor-pointer"
        onClick={() => sortHandler(column)}
      >{`${column} ${symbol()}`}</span>
    );
  };

  const sortHandler = column => {
    if (sortedBy === column) {
      setIsAsc(!isAsc);
    } else {
      setSortedBy(column);
      setIsAsc(true);
    }
  };

  return (
    <table className="table-fixed w-full text-sm text-left text-gray-400">
      <thead className="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          {columns.map(col => (
            <th key={col} className="px-6 py-3">
              <SortSpan column={col} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortData().map(book => {
          return (
            <tr
              key={book.Isbn}
              className="bg-gray-900 hover:bg-gray-800 border-b border-gray-700"
            >
              <td className="px-6 py-4">{book.Isbn}</td>
              <td className="px-6 py-4">{book.Title}</td>
              <td className="px-6 py-4">{book.Author}</td>
              <td className="px-6 py-4">{book.Year}</td>
              <td className="px-6 py-4">{book.Publisher}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
