import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import styles from "./style.module.css";

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

const tableColumns = [
  { name: "Serial No.", align: "left" },
  { name: "Name", align: "right" },
  { name: "Age", align: "right" },
  { name: "Address", align: "right" },
  { name: "Marital Status", align: "right" },
  { name: "Actions", align: "right" },
];

export const TableData = ({ handleDelete, data, dataId, handleUpdate }) => {
  return (
    <TableContainer component={Paper} sx={{ width: "90%", margin: "auto" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {data.length === 0 && <p className={styles.norecord}>No records in DB.</p>}
        {data.length > 0 && (
          <TableHead>
            <TableRow>
              {tableColumns.map((c) => (
                <StyledTableCell key={`${c.name}-${c.align}`} align={c.align}>{c.name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((item, i) => {
            const isDisabled = dataId === item.id;
            return (
              <StyledTableRow key={`${item.name}-${i}`}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{item.name}</StyledTableCell>
                <StyledTableCell align="right">{item.age}</StyledTableCell>
                <StyledTableCell align="right">{item.address}</StyledTableCell>
                <StyledTableCell align="right">{item.maritalStatus}</StyledTableCell>
                <StyledTableCell align="right">
                  <Icon
                    color={isDisabled ? "disabled" : "primary"}
                    className="cursor-pointer"
                    onClick={() => handleUpdate(item.id)}
                    disabled={isDisabled}
                    fontSize="medium"
                  >
                    edit_circle
                  </Icon>
                  <Icon
                    color={isDisabled ? "disabled" : "error"}
                    className="cursor-pointer ml-12"
                    onClick={() => handleDelete(item.id)}
                    disabled={isDisabled}
                    fontSize="medium"
                  >
                    delete_cirle
                  </Icon>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
