import { Notification } from "../../models/notification";

export interface IAuth {
  status: number;
  message: Notification;
}

export interface IUser {
  username: string | undefined;
  password: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
}
