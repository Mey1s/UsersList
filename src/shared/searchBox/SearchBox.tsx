import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBox.module.scss";
import Button from "@mui/material/Button";

interface SearchBoxPropsI {
  setSearchValue: (value: string) => void;
  onClick: () => void;
}

const SearchBox: React.FC<SearchBoxPropsI> = ({ setSearchValue, onClick }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        onChange={(e: any) => {
          setSearchValue(e.target.value ? e.target.value : "")
        }
          
        }
        type="text"
        placeholder="Search.."
      />
      <Button variant="outlined" onClick={onClick}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
