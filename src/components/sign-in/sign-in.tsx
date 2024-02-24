import { Box, Button, TextField } from "@mui/material";
import style from "./style.module.scss";
import { signInAction } from "../../store/slices/auth-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { HttpAuthService } from "../../services/http/http-auth.service";
import { di } from "../../di/container";
import { TOKENS } from "../../di/tokens";
import { IUser } from "../../models/auth/auth";
import { navigateAction } from "../../store/slices/redirect-slice";
import { Notification, NotificationType } from "../../models/notification";
import NotificationMessage from "../shared/notification-message";
import { Messages } from "../../models/messages";

function SignIn() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [notification, setNotification] = useState<Notification>();

  let authService: HttpAuthService = di.Resolver(
    TOKENS.httpAuthService
  ) as HttpAuthService;

  async function signIn() {
    let user: IUser = {
      username: userName,
      password: password,
    };

    await authService
      .signIn(user)
      .then((result) => {
        if (result.status === 200) {
          dispatch(signInAction(result.data));
        }
      })
      .catch((error) => {
        setNotification({
          type: NotificationType.ERROR,
          message: Messages.SomethingWentWrong,
        });
        console.log(error);
      });
  }

  function signUp() {
    dispatch(navigateAction({ register: true }));
  }

  return (
    <div className={style.wrapper}>
      <div className={`${style.inner} ${style.myDiv}`}>
        <Box>
          <div style={{ paddingBottom: "30px" }}>
            <TextField
              fullWidth
              label="User name"
              id="username"
              size="small"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div style={{ paddingBottom: "30px" }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              id="password"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              paddingBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={signIn}>
              Sign In
            </Button>
            <Button variant="contained" onClick={signUp}>
              Sign Up
            </Button>
          </div>
        </Box>
      </div>
      {notification && <NotificationMessage notific={notification} />}
    </div>
  );
}

export default SignIn;
