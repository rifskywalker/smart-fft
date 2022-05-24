import MaterialTable, {
  MaterialTableProps,
  Column,
  MTableBodyRow,
} from "material-table";
import { TablePagination, TablePaginationProps } from "@material-ui/core";
import { DeleteIcon, ViewIcon, SearchIcon, EditIcon } from "@chakra-ui/icons";
// import Icon from "@mui/material/Icon";
import { createRef, useState } from "react";

import trash from "../../Assets/Images/trash.png";
import write from "../../Assets/Images/write.png";
import filterClear from "../../Assets/Images/filterClear.png";

import { useToast } from "@chakra-ui/react";

function PatchedPagination(props) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      // @ts-expect-error onChangePage was renamed to onPageChange
      rowsPerPageOptions={[10, 20, 50]}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          // @ts-expect-error ActionsComponent is provided by material-table
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}

function App({
  tableRef,
  nameForSearch,
  muiTableKey,
  setMuiTableKey,
  setNameForSearch,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const toast = useToast();
  const columns = [
    { title: "Process Name", field: "name" },
    { title: "AlterEgo", field: "alterEgo" },
  ];

  const fetchData = (query, nameForSearch) => {
    return new Promise((resolve, reject) => {
      let url = "";

      //sorting
      if (query.orderBy) {
        url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
      }

      //filtering
      if (nameForSearch.trim().length) {
        url += `&name_like=${nameForSearch.trim()}`;
      }

      if (url == "") {
        url += `&_sort=id&_order=desc`;
      }

      //pagination
      url += `&_page=${query.page + 1}`;
      url += `&_limit=${query.pageSize}`;

      url = `${process.env.REACT_APP_API_END_POINT}/superheroes?` + url;

      // fetch(url)
      //   .then((resp) => resp.json())
      //   .then((resp) => {
      //     console.log(resp);
      //     resolve({
      //       data: resp, // your data array
      //       page: query.page, // current page number
      //       totalCount: 499, // total row number
      //     });
      //   });

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          //throw new Error("Something went wrong");
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        })
        .then((responseJson) => {
          resolve({
            data: responseJson, // your data array
            page: query.page, // current page number
            totalCount: 499, // total row number
          });
        })
        .catch((error) => {
          toast({
            title: "Please check your internet !!!",
            description: error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          console.error(error);
        });
    });
  };

  return (
    <MaterialTable
      title="Process"
      tableRef={tableRef}
      columns={columns}
      // draggable={false}
      key={muiTableKey}
      options={{
        pageSize: 10,
        debounceInterval: 700,
        padding: "dense",
        filtering: false,
        search: false,
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
        }),
        headerStyle: {
          // backgroundColor: "#545955",
          // color: "#FFF",
          fontSize: 16,
          // rowStyle: { "&:hover": { backgroundColor: "#EEE" } },
        },
      }}
      components={{
        Pagination: PatchedPagination,
      }}
      data={(query) => fetchData(query, nameForSearch)}
      // editable={{
      //   onRowDelete: (oldData) =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         // const dataDelete = [...data];
      //         // const index = oldData.tableData.id;
      //         // dataDelete.splice(index, 1);
      //         // setData([...dataDelete]);
      //         resolve();
      //       }, 1000);
      //     }),
      // }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      actions={[
        {
          icon: "visibility",
          tooltip: "View User",
          iconProps: { color: "disabled" },
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.nameForSearch),
        },
        {
          icon: () => <img src={write} alt="" width={23} />,
          tooltip: "edit User",
          iconProps: { color: "primary" },
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.nameForSearch),
          //  new Promise((resolve, reject) => {
          //   resolve();
          // }
          //}
        },
        {
          icon: () => <img src={trash} alt="" width={23} />,
          tooltip: "Delete User",
          iconProps: { color: "secondary" },
          onClick: (event, rowData) =>
            tableRef.current && tableRef.current.onQueryChange(),
        },
        {
          icon: "refresh",
          tooltip: "Refresh Data",
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        },
        {
          icon: () => <img src={filterClear} alt="" width={23} />,
          tooltip: "clear all filters",
          isFreeAction: true,
          onClick: (event) => {
            setNameForSearch("");
            setMuiTableKey(muiTableKey + 1); // set new key causing remount
          },
        },
      ]}
      // editable={{
      //   onRowDelete: (oldData, query) =>
      //     new Promise((resolve, reject) => {
      //       //Backend call

      //       fetch(url + "/" + oldData.id, {
      //         method: "DELETE",
      //         headers: {
      //           "Content-type": "application/json",
      //         },
      //       })
      //         .then((resp) => resp.json())
      //         .then((resp) => {
      //           getStudents(query);
      //           resolve();
      //         });
      //     }),
      // }}
    />
  );
}

export default App;
