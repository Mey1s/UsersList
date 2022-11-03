import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserCard from "../userCard/UserCard";
import styles from "./UsersList.module.scss";

const UsersList: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <main className={styles.usersListContainer}>
      <div className={styles.usersList}>
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </main>
  );
};

export default UsersList;
