import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.slice";
import styles from "./UserAdd.module.scss";

interface UserAddPropsI {
  onClose: () => void;
}

const UserAdd: React.FC<UserAddPropsI> = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (person: any) => {
    dispatch(addUser({ ...person, id: uuidv4() }));

    onClose();
  };

  return (
    <Box className={styles.boxContainer}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <TextField
          {...register("title", { required: true })}
          type="text"
          label="User Title"
          variant="outlined"
        />
        <TextField
          {...register("firstName", { required: true, minLength: 3 })}
          type="text"
          label="User First Name"
          variant="outlined"
        />
        <TextField
          {...register("lastName", { required: true, minLength: 3 })}
          type="text"
          label="User Last Name"
          variant="outlined"
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
        />
        <TextField
          {...register("streetNumber", { required: true, min: 0 })}
          type="number"
          label="Street Number"
          variant="outlined"
        />
        <TextField
          {...register("streetName", { required: true, minLength: 1 })}
          type="text"
          label="Street Name"
          variant="outlined"
        />
        <TextField
          {...register("city", { required: true, minLength: 1 })}
          type="text"
          label="City"
          variant="outlined"
        />
        <TextField
          {...register("state", { required: true, minLength: 1 })}
          type="text"
          label="State"
          variant="outlined"
        />
        <TextField
          {...register("country", { required: true, minLength: 1 })}
          type="text"
          label="Country"
          variant="outlined"
        />
        <TextField type="text" label="Avatar Image Source" variant="outlined" />

        {errors.title && (
          <p className={styles.errorText}>Title can't be empty</p>
        )}
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
        {errors.userImage && (
          <p className={styles.errorText}>User Image source can't be empty</p>
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

export default UserAdd;
