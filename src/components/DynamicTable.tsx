import * as React from "react";
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    ColumnFiltersState,
  } from "@tanstack/react-table";
import { paginationOption } from "./TablePagination";

type tableColumn ={

}

type dynamicTableProp ={
    data: []|[Object],
    columns: ColumnDef<any>[],
} & paginationOption;

function DynamicTable(tableProp:dynamicTableProp) {
    const { data,columns } = tableProp;
    const [defaultColumns, setDefaultColumns ] = React.useState([...columns]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
    const table = useReactTable({
        data,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(200 / 10),
      });
  return (
    <table className="table table-striped table-hover table-bordered">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={table.getAllLeafColumns().length}
                className="text-center"
              >
                Sorry! No Data Found!
              </td>
            </tr>
          )}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
  )
}

export default DynamicTable