import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./style.module.css";

export const TableData = ({ handleDelete, data, handleUpdate, index }) => {
  console.log('Table render');

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{width: '90%', margin: 'auto'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {data.length === 0 && (
          <p className={styles.norecord}>No records in DB.</p>
        )}
        {data.length > 0 && (
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Marital Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((item, i) => (
            <StyledTableRow key={`${item.name}-${i}`}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{item.name}</StyledTableCell>
              <StyledTableCell align="right">{item.age}</StyledTableCell>
              <StyledTableCell align="right">
                {item.maritalStatus}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(i)}
                  disabled={typeof i === "number" ? i === index : false}
                  sx={{ borderRadius: "40%", marginRight: "0.3rem" }}
                  size="large"
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(i)}
                  disabled={typeof i === "number" ? i === index : false}
                  sx={{ borderRadius: "40%" }}
                  color="error"
                  size="large"
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
