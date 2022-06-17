/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { BiSortAlt2 } from 'react-icons/bi'
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'

export default function InvoiceTableHead({ headerGroups }: any) {
  return (
    <>
      <thead>
        {headerGroups.map((headerGroup: any, index: number) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, indexN: number) => (
              <th
                key={indexN}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span className="ml-2">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortAmountDownAlt />
                    ) : (
                      <FaSortAmountUp />
                    )
                  ) : (
                    <BiSortAlt2 />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <style jsx>{`
        th {
          border: 1px solid #e5e5e6;
          text-align: center;
          padding: 10px;
        }
        .table {
          width: 100%;
          padding: 0px 10px;
          background-color: white;
        }
        tr th:first-child span {
          display: none;
        }
        tr th {
          display: table-cell;
          position: relative;
        }
        tr th span {
          margin: 0;
          position: absolute;
          top: 14px;
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}
