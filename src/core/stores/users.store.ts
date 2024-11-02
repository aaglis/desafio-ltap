import { Action, action, createStore, thunk, Thunk } from "easy-peasy";
import { IUser } from "../interfaces/user.interface";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/user.service";

export interface UserModel {
  users: IUser[];
  setUsers: Action<UserModel, IUser[]>;
  fetchUsers: Thunk<UserModel>;
  addUser: Thunk<UserModel, Omit<IUser, "id">>;
  updateUser: Thunk<UserModel, IUser>;
  removeUser: Thunk<UserModel, number>;
}

const userModel: UserModel = {
  users: [],
  setUsers: action((state, users) => {
    state.users = users;
  }),
  fetchUsers: thunk(async (actions) => {
    const data = await getUsers();
    actions.setUsers(data);
  }),

  addUser: thunk(async (actions, newUser: IUser, { getState }) => {
    const createdUser = await createUser(newUser);
    const currentUsers = getState().users;
    actions.setUsers([...currentUsers, createdUser]);
  }),

  updateUser: thunk(async (actions, updatedUser, { getState }) => {
    await updateUser(updatedUser.id, updatedUser);
    const currentUsers = getState().users;
    actions.setUsers(
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
  }),

  removeUser: thunk(async (actions, userId: number, { getState }) => {
    await deleteUser(userId);
    const currentUsers = getState().users;
    actions.setUsers(currentUsers.filter((user) => user.id !== userId));
  }),
};

const store = createStore(userModel);

export default store;
