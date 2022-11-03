import React, { useState } from "react";
import { PersonI } from "../../types/users/Person";
import styles from "./UserCard.module.scss";
import {
  Modal,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import UserEdit from "../userEdit/UserEdit";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/slices/user.slice";

interface UserCardPropsI {
  user: PersonI;
}

const UserCard: React.FC<UserCardPropsI> = ({ user }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const toggleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  const toggleOpenDeleteDialog = () => {
    setOpenDeleteDialog((prev) => !prev);
  };

  const onDeleteUser = () => {
    dispatch(deleteUser({ id: user.id }));
  };

  return (
    <Card className={styles.userCardContainer}>
      <CardContent>
        <Typography variant="h5" component="div" align="center">
          <Avatar
            alt={`${user.title} ${user.firstName} ${user.lastName}`}
            src={user.userImage}
            className={styles.userAvatarImg}
          />
          <p>
            {user.title} {user.firstName} {user.lastName}
          </p>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
          {user.email}
        </Typography>
        <Typography variant="body2" align="center">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions className={styles.buttonsContainer}>
        <Button variant="outlined" onClick={toggleOpenDeleteDialog}>
          Delete
        </Button>
        <Button variant="outlined" onClick={toggleOpenModal}>
          Edit
        </Button>
      </CardActions>
      <Modal
        onClose={toggleOpenModal}
        open={openModal}
        aria-labelledby="modal-user"
        aria-describedby="modal-user"
      >
        <UserEdit user={user} onClose={toggleOpenModal} />
      </Modal>
      <Dialog open={openDeleteDialog} onClose={toggleOpenDeleteDialog}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
            {user.id}
            <br />
            {user.firstName} {user.lastName}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.buttonsContainer}>
          <Button onClick={toggleOpenDeleteDialog}>Cancel</Button>
          <Button onClick={onDeleteUser}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UserCard;
