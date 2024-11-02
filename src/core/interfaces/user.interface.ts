export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IEditUserModalProps {
  userData: IUser;
}
