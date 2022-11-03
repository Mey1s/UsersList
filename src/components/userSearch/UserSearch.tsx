import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Avatar, Button } from "@mui/material";
import SearchBox from "../../shared/searchBox/SearchBox";
import { RootState } from "../../store";
import { PersonI } from "../../types/users/Person";
import styles from "./UserSearch.module.scss";
import UserAdd from "../userAdd/UserAdd";
import {
  fetchUsersUpdateSearch,
  setAllUsers,
} from "../../store/slices/user.slice";

const UserSearch: React.FC = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const users = useSelector((state: RootState) => state.user.users);
  const [searchValue, setSearchValue] = useState("");

  const filterUsers = () => {
    if (searchValue === "") {
      return dispatch(fetchUsersUpdateSearch());
    }

    const newUsers = users.filter((user) => {
      const name = `${user.title} ${user.firstName} ${user.lastName}`;
      const location = `${user.streetNumber} ${user.streetName} ${user.city} ${user.state} ${user.country}`;

      if (
        name === searchValue ||
        location === searchValue ||
        user.id === searchValue ||
        user.email === searchValue
      ) {
        return true;
      }

      return false;
    });

    dispatch(setAllUsers(newUsers));
  };

  const toggleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <header className={styles.userSearchContainer}>
      <SearchBox setSearchValue={setSearchValue} onClick={filterUsers} />
      <p className={styles.addUserText} onClick={toggleOpenModal}>
        Add new user
      </p>
      <Modal
        onClose={toggleOpenModal}
        open={openModal}
        aria-labelledby="modal-add-user"
        aria-describedby="modal-add-user"
      >
        <UserAdd onClose={toggleOpenModal} />
      </Modal>
    </header>
  );
};

export default UserSearch;
