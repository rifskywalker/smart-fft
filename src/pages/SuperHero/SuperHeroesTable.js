import { useMemo, useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import { useTable, usePagination, useSortBy } from "react-table";
import { useSearch } from "../../hooks/SuperHero/useSuperHeroData";
import { Button, Input } from "@chakra-ui/react";
import { useQueryClient, QueryCache } from "react-query";

const TableContainer = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const trimData = (data) => {
  if (data) {
    return data?.map(({ id, name, alterEgo }) => ({
      id,
      name,
      alterEgo,
    }));
  } else {
    return [];
  }
};

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 5,
  totalCount: null,
  // queryPageSortBy: [{ id: "id", desc: true }],
  // queryPageSortBy: [],
};

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    // case PAGE_SORT_CHANGED:
    //   // console.log("PAGE_SORT_CHANGED", payload);
    //   return {
    //     ...state,
    //     queryPageSortBy: payload,
    //   };

    case PAGE_SORT_CHANGED:
      return {
        ...state,
        queryPageSortBy: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

function SuperHeroesTable() {
  const [name, setName] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "AlterEgo",
        accessor: "alterEgo",
      },
    ],
    []
  );

  const [
    { queryPageIndex, queryPageSize, totalCount, queryPageSortBy },
    dispatch,
  ] = useReducer(reducer, initialState);

  const onSuccess = (data) => {
    //if cannot insert in server
    if (data) {
      data.data = {
        count: 1126,
        result: [...data.data],
      };
    } else {
    }
  };

  const onError = (error) => {
    return <p>{error}</p>;
  };

  const { isLoading, error, data, isSuccess, isError, refetch } = useSearch(
    queryPageIndex,
    queryPageSize,
    onSuccess,
    onError,
    name,
    queryPageSortBy
  );

  const handleOnSearch = async () => {
    // queryClient.invalidateQueries("super-heroes"); //refresh data table
    // queryCache.clear();
    await gotoPage(0);
    await refetch();
  };

  const totalPageCount = Math.ceil(totalCount / queryPageSize);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: isSuccess ? trimData(data.data.result) : [],
      initialState: {
        // pageIndex: queryPageIndex,
        // pageSize: queryPageSize,
        // // sortBy: queryPageSortBy,

        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        // sortBy: queryPageSortBy,
      },
      manualPagination: true,
      pageCount: data ? totalPageCount : null,
      // autoResetSortBy: true,
      // autoResetExpanded: false,
      // autoResetPage: false,
      // autoResetSortBy: false,
      // disableSortRemove:true,
      // pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null,
      manualSortBy: true,
      // disableMultiSort
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: pageIndex });
  }, [pageIndex]);

  useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
    gotoPage(0);
  }, [pageSize, gotoPage]);

  useEffect(() => {
    if (data?.data.count) {
      dispatch({
        type: TOTAL_COUNT_CHANGED,
        payload: data.data.count,
      });
    }
  }, [data?.data.count]);

  // useEffect(() => {
  //   console.log(sortBy);
  //   dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });

  //   refetch();
  //   gotoPage(0);
  // }, [sortBy]);

  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });
    gotoPage(0);
    console.log(sortBy, queryPageSortBy);

    refetch();
  }, [sortBy, gotoPage]);

  if (error) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {" "}
      <Button onClick={handleOnSearch}>Search</Button>
      <Input
        placeholder="Basic usage"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TableContainer>
        {isSuccess ? (
          <>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </Button>{" "}
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </Button>{" "}
              <Button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </Button>{" "}
              <Button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </Button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  value={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}
      </TableContainer>
    </>
  );
}

export default SuperHeroesTable;
