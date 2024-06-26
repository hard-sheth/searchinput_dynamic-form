import * as React from "react";
import ReactPaginate from "react-paginate";

type paginationOption = {
  position?: "start" | "end" | "center"| "between";
  totalPages: number;
  showSelectOptions: boolean;
  readonly selectOptions?: Array<Number>;
  currentPageSize?: Number;
  readonly updatePageClick:(page:number)=>void
  readonly updatePageSize?:(page:number)=>void
};

function PaginationReact(props: paginationOption) {
  const { selectOptions, position, totalPages, showSelectOptions, currentPageSize, updatePageClick, updatePageSize } = props;
  const handlePageClick = (event:any) => {
    updatePageClick(event.selected)
  };
  return (
    <div className={`d-flex justify-content-${position == 'end'? 'end' : position == 'center'?'center': position == 'start'? 'start': position == "between" ? 'between': 'between'}`}>
      {showSelectOptions && (
        <div >
          <select className={`form-select`} onChange={e=>{
            if(updatePageSize){
              updatePageSize(Number(e.target.value))
            }
            }}>
            {selectOptions &&
              selectOptions.map((pageSize, index: number) => (
                <option key={index} value={`${pageSize}`} selected={currentPageSize == pageSize}>
                  {`${pageSize}`}
                </option>
              ))}
          </select>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination justify-content-end"
        pageClassName="rounded page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeLinkClassName="active"
        disabledClassName="disabled"
        previousClassName="page-item rounded-start"
        nextClassName="page-item rounded-end"
      />
    </div>
  );
}

export {
    PaginationReact,
    paginationOption
};
