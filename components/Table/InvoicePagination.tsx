/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-onchange */

const paginationArray = ['<<', '<', '>', '>>']

function paginationHandler(indexCount: number, tableInstance: any) {
  const { gotoPage, previousPage, nextPage, pageCount } = tableInstance
  switch (indexCount) {
    case 0:
      return gotoPage(0)
    case 1:
      return previousPage()
    case 2:
      return nextPage()
    case 3:
      return gotoPage(pageCount - 1)
    default:
      return null
  }
}

function disablePagination(indexCount: number, tableInstance: any): boolean {
  const { canPreviousPage, canNextPage } = tableInstance
  switch (indexCount) {
    case 0:
      return !canPreviousPage
    case 1:
      return !canPreviousPage
    case 2:
      return !canNextPage
    case 3:
      return !canNextPage
    default:
      return false
  }
}

export default function InvoicePagination({ tableInstance }: any): JSX.Element {
  const {
    gotoPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance
  return (
    <>
      <div className="pagination flex items-center mx-auto justify-center">
        {paginationArray.map((paginationItem, index) => (
          <button
            key={index}
            type="button"
            className="hover:bg-red-400 hover:text-white"
            disabled={disablePagination(index, tableInstance)}
            onClick={() => paginationHandler(index, tableInstance)}
          >
            {paginationItem}
          </button>
        ))}

        <span className="ml-4 flex">
          Page
          <p className="font-bold ml-2">
            {pageIndex + 1} of {pageOptions.length}
          </p>
        </span>
        <span className="ml-2">
          | Go to page:
          <input
            style={{ width: '100px' }}
            type="number"
            className="mx-2 text-center w-10 border "
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageVal = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageVal)
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSizeVal) => (
            <option key={pageSizeVal} value={pageSizeVal}>
              Show {pageSizeVal}
            </option>
          ))}
        </select>
      </div>
      <style jsx>
        {`
          .pagination button {
            border: 1px solid var(--color-7);
            padding: 2px 5px;
            margin: 0px 5px;
            background-color: white;
          }
          .pagination {
            margin: 30px 0px;
          }
        `}
      </style>
    </>
  )
}
