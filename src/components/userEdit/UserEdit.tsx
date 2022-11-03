import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { PersonI } from "../../types/users/Person";
import { setUser } from "../../store/slices/user.slice";
import styles from "./UserEdit.module.scss";

interface UserEditPropsI {
  user: PersonI;
  onClose: () => void;
}

const UserEdit: React.FC<UserEditPropsI> = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (person: any) => {
    dispatch(
      setUser({
        ...person,
        id: user.id,
        title: user.title,
        userImage: user.userImage,
      })
    );

    onClose();
  };

  return (
    <Box className={styles.boxContainer}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <TextField
          {...register("firstName", { required: true, minLength: 3 })}
          type="text"
          label="User First Name"
          variant="outlined"
          defaultValue={user.firstName}
        />
        <TextField
          {...register("lastName", { required: true, minLength: 3 })}
          type="text"
          label="User Last Name"
          variant="outlined"
          defaultValue={user.lastName}
        />
        <TextField
          {...register("email", {
            required: true,
            validate: (value) => {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              );
            },
          })}
          type="text"
          label="Email"
          variant="outlined"
          defaultValue={user.email}
        />
        <TextField
          {...register("streetNumber", { required: true, min: 0 })}
          type="number"
          label="Street Number"
          variant="outlined"
          defaultValue={user.streetNumber}
        />
        <TextField
          {...register("streetName", { required: true, minLength: 1 })}
          type="text"
          label="Street Name"
          variant="outlined"
          defaultValue={user.streetName}
        />
        <TextField
          {...register("city", { required: true, minLength: 1 })}
          type="text"
          label="City"
          variant="outlined"
          defaultValue={user.city}
        />
        <TextField
          {...register("state", { required: true, minLength: 1 })}
          type="text"
          label="State"
          variant="outlined"
          defaultValue={user.state}
        />
        <TextField
          {...register("country", { required: true, minLength: 1 })}
          type="text"
          label="Country"
          variant="outlined"
          defaultValue={user.country}
        />
        {errors.firstName && (
          <p className={styles.errorText}>
            First name must contains at least 3 characters
          </p>
        )}
        {errors.lastName && (
          <p className={styles.errorText}>
            Last name must contains at least 3 characters
          </p>
        )}
        {errors.email && (
          <p className={styles.errorText}>Email must be valid</p>
        )}
        {errors.streetNumber && (
          <p className={styles.errorText}>
            Street number can't be negative or empty
          </p>
        )}
        {errors.streetName && (
          <p className={styles.errorText}>
            Street name can't be negative or empty
          </p>
        )}
        {errors.city && <p className={styles.errorText}>City can't be empty</p>}
        {errors.state && (
          <p className={styles.errorText}>State can't be empty</p>
        )}
        {errors.country && (
          <p className={styles.errorText}>Country can't be empty</p>
        )}

        <div className={styles.buttonsContainer}>
          <Button type="submit" variant="outlined" onClick={onFormSubmit}>
            Save
          </Button>
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default UserEdit;
