import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../models/auth/auth";
import { Notification, NotificationType } from "../../models/notification";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    signIn: {} as IAuth,
    signUp: {} as IAuth,
  },
  reducers: {
    signInAction: (currentSlice, actions) => {
      currentSlice.signIn = {
        status: actions.payload.status,
        message: {
          type:
            actions.payload.status === 6
              ? NotificationType.SUCCESS
              : NotificationType.ERROR,
          message: actions.payload.message,
        } as Notification,
      } as IAuth;

      if (actions.payload.token !== "") {
        sessionStorage.setItem("token", JSON.stringify(actions.payload.token));
      }
    },
    signOutAction: (currentSlice, actions) => {
      currentSlice.signIn = actions.payload;
      currentSlice.signUp = actions.payload;
      sessionStorage.removeItem("token");
    },
    signUpAction: (currentSlice, actions) => {
      currentSlice.signUp.status = actions.payload.status;

      currentSlice.signUp.message = {
        type:
          actions.payload.status === 2
            ? NotificationType.SUCCESS
            : NotificationType.ERROR,
        message: actions.payload.message,
      } as Notification;
    },
  },
});

export { authSlice };

export const { signInAction, signOutAction, signUpAction } = authSlice.actions;
