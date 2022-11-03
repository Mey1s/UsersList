import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { PersonI } from "../../types/users/Person";
import { UsersResponse } from "../../types/users/UsersResponse";

interface IOrganizationState {
  users: PersonI[];
}

const initialState: IOrganizationState = {
  users: [],
};

export const fetchUsersUpdateSearch: any = createAsyncThunk(
  "users/fetchUsersData",
  async () => {
    const response: AxiosResponse<UsersResponse.RootObject> = await axios.get(
      "https://randomuser.me/api/?results=10"
    );

    return response.data.results.map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
      title: user.name.title,
      email: user.email,
      userImage: user.picture.medium,
      id: user.id.value,
      streetNumber: user.location.street.number,
      streetName: user.location.street.name,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
    }));
  }
);

// ** Fetch Users
export const fetchUsersData: any = createAsyncThunk(
  "users/fetchUsersData",
  async () => {
    const users = localStorage.getItem("users");

    if (users) {
      return JSON.parse(users);
    }

    const response: AxiosResponse<UsersResponse.RootObject> = await axios.get(
      "https://randomuser.me/api/?results=10"
    );

    return response.data.results.map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
      title: user.name.title,
      email: user.email,
      userImage: user.picture.medium,
      id: user.id.value,
      streetNumber: user.location.street.number,
      streetName: user.location.street.name,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
    }));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<PersonI>) => {
      state.users = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    setUser: (state, action: PayloadAction<PersonI>) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(state.users));
    },
    setAllUsers: (state, action: PayloadAction<PersonI[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      // Add user to the state array
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    });
  },
});

export const { addUser, setUser, deleteUser, setAllUsers } = userSlice.actions;

export default userSlice.reducer;
