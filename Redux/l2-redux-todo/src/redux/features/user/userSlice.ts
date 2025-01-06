import { RootState } from "@/redux/store";
import { IUser } from "@/types/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  users: IUser[];
}

const initialState: IInitialState = {
  users: [
    {
      id: "90218e789wdu",
      name: "Naym",
    },
    {
      id: "2376372",
      name: "Rohim",
    },
    {
      id: "23987e8923",
      name: "Korem",
    },
  ],
};

type TDraftUser = Pick<IUser, "name">;

const createUser = (userData: TDraftUser): IUser => {
  return {
    id: nanoid(),
    ...userData,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const userData = createUser(action.payload);
      state.users.push(userData);
    },
    removeUser: (state, actions: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== actions.payload);
    },
  },
});

export const selectUsers = (state: RootState) => {
  return state?.user.users;
};

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
