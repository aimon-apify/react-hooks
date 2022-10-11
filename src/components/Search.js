import TextField from "@mui/material/TextField";

const Search = ({ searchQuery, handleSearchQuery }) => {
  return (
    <TextField
      label="Search..."
      type="search"
      value={searchQuery}
      onChange={(e) => handleSearchQuery(e.target.value)}
      sx={{ display: "flex", width: "25%", margin: "auto", marginTop: "6rem", marginBottom: "3rem" }}
    />
  );
};

export default Search;
