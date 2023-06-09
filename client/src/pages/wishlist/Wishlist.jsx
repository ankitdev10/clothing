import "./wishlist.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { userStore } from "../../store";
import React from "react";
import { useTable } from "react-table";

const Wishlist = () => {
  const { user } = userStore((state) => state);
  const fetchWishlist = async () => {
    return await axios.get("/user/wishlist/" + user._id);
  };
  const { data } = useQuery(["fetchWishlist-"], fetchWishlist);

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data?.data });

  return (
    // <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
    //   <thead>
    //     {headerGroups?.map((headerGroup) => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup?.headers?.map((column) => (
    //           <th
    //             {...column.getHeaderProps()}
    //             style={{
    //               borderBottom: "solid 3px red",
    //               background: "aliceblue",
    //               color: "black",
    //               fontWeight: "bold",
    //             }}
    //           >
    //             {column.render("Header")}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows?.map((row) => {
    //       prepareRow(row);
    //       return (
    //         <tr {...row.getRowProps()}>
    //           {row?.cells?.map((cell) => {
    //             return (
    //               <td
    //                 {...cell.getCellProps()}
    //                 style={{
    //                   padding: "10px",
    //                   border: "solid 1px gray",
    //                   background: "papayawhip",
    //                 }}
    //               >
    //                 {cell.render("Cell")}
    //               </td>
    //             );
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>

    <h1>hello</h1>
  );
};

export default Wishlist;
