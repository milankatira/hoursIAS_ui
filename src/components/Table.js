import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ResponsiveAppBar from "./Header";
import { Button } from "@mui/material";
import { getPdfService } from "../service/pdf.service";
import styles from './table.module.scss';
import { serverUrl } from "../constant/appConfig";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, action) {
  // const density = population / size;
  return { name, action };
}

const rows = [
  createData("India"),
  createData("China"),
  createData("Italy"),
  createData("United States"),
  createData("Canada"),
  createData("Australia"),
  createData("Germany"),
  createData("Ireland"),
  createData("Mexico"),
  createData("Japan"),
  createData("France"),
  createData("United Kingdom"),
  createData("Russia"),
  createData("Nigeria"),
  createData("Brazil"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pdfData, setpdfData] = React.useState([]);
  React.useEffect(() => {
    getPdfService().then((res) => setpdfData(res.data.result));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>Main table</TableHead>
            <TableBody>
              {pdfData.map((column) => {
                return (
                  <TableRow>
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={styles.main__container}
                    >
                      {column.fileName}
                    </TableCell>
                    <TableCell>
                      <a href={`${serverUrl}${column.fileName}`} target="_blank">View</a>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
