import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import DebounceInput from "./DebounceInput";

type dynamicTableProp = {
  data: [] | [Object] | any;
  columns: ColumnDef<any>[];
  filter: Boolean;
  sorting: Boolean;
  updateSorting: (data:Object)=>void;
  updateFilter: (data:Object)=>void;
};

function TableReact(tableProp: dynamicTableProp) {
  const { data, columns,filter, sorting, updateSorting, updateFilter } = tableProp;
  const [defaultColumns, setDefaultColumns] = React.useState([...columns]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns: defaultColumns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });
  updateSorting(table.getState().sorting);
  updateFilter(table.getState().columnFilters); 
  return (
    <table className="table table-striped table-hover table-bordered">
      <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                :  (
                  <>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: sorting?header.column.getToggleSortingHandler():()=>{},
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {filter && header.column.getCanFilter() ? (
                      <DebounceInput column={header.column}/>
                    ) : null}
                  </>
                )
              }
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
    </table>
  );
}

export { TableReact };
