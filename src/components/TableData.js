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

export const TableData = ({ handleDelete, data, searchedData, handleUpdate, index, searchQuery, filterRecords }) => {
  const SearchQueryData = searchQuery === "" ? data : [];
  const showData = filterRecords.length > 0 && searchQuery !== "" ? filterRecords : SearchQueryData;

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
    <TableContainer component={Paper} sx={{ width: "90%", margin: "auto" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {showData.length === 0 && <p className={styles.norecord}>No records in DB.</p>}
        {showData.length > 0 && (
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Marital Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {showData.map((item, i) => {
            const isDisabled = typeof i === "number" ? i === index : false;
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
                    onClick={() => handleUpdate(i)}
                    disabled={isDisabled}
                    fontSize="medium"
                  >
                    edit_circle
                  </Icon>
                  <Icon
                    color={isDisabled ? "disabled" : "error"}
                    className="cursor-pointer ml-12"
                    onClick={() => handleDelete(i)}
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
