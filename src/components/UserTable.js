import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Drawer, IconButton } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import styled from "styled-components";
import ChevronRight from "@mui/icons-material/ChevronRight";
import DrawerResultCard from "./DrawerResultCard";

const columns = [
  { id: "email", label: "Email" },
  { id: "firstName", label: "First Name" },

  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "phone",
    label: "Phone",
    // minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: "yearOfBirth",
    label: "Birth Year",
    // minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: "Actions",
    label: "Results",
    align: "left",
    // minWidth: 200,
  },
];

export default function UserTable({ userData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDrawer = (drawerState) => {
    setOpen(drawerState);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        value && (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      );
                    })}
                    <TableCell key="Actions">
                      <Button
                        onClick={() => {
                          handleDrawer(true);
                        }}
                        variant="contained"
                        style={{backgroundColor:"black",color:"white"}}
                      >
                        Show Result
                      </Button>
                      <Button>
                        <DownloadOutlined style={{color:"black"}} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

      />
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            zIndex: 3000,
            width: 340,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              handleDrawer(false);
            }}
       
          >
            <ChevronRight   />
          </IconButton>
        </DrawerHeader>
        <DrawerResultCard data={userData} />
      </Drawer>
    </Paper>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 1,
  // necessary for content to be below app bar

  justifyContent: "flex-start",
}));
