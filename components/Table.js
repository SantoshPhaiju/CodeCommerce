import Link from "next/link";
import React, { useState } from "react";

const Table = ({ tableData, columns }) => {

  return (
    <>

      {tableData.length > 0 && (
        <div className="overflow-x-auto shadow-md shadow-gray-500/30 mb-3">
          <table className="border-collapse border border-gray-900 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-base font-firasans text-white bg-indigo-900 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-4 px-6 border-2 border-gray-700 text-center"
                >
                  S.N.
                </th>
                {columns.map((col, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="py-4 px-6 border-2 border-gray-700 text-center"
                    >
                      {col.field}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableData
                .map((item, index) => {
                //   console.log(item);
                  return (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-800 dark:border-gray-700 text-center font-firasans hover:bg-blue-200/80 cursor-pointer odd:bg-gray-200 even:bg-white"
                    >
                      <td className="py-4 px-6 border-2 border-gray-700 text-center">
                        {index + 1}
                      </td>
                      {columns.map((col, index) => {
                        return (
                          <td key={index} className="py-4 px-6 border-2 border-gray-700 text-center">
                            {item[col.field]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
