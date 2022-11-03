import React from "react";
import UserSearch from "../../components/userSearch/UserSearch";
import UsersList from "../../components/usersList/UsersList";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <UserSearch />
      <UsersList />
    </div>
  );
};

export default Home;
