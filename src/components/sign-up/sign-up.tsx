import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { navigateAction } from "../../store/slices/redirect-slice";
import { ChangeEvent, useState } from "react";
import { IUser } from "../../models/auth/auth";
import { HttpAuthService } from "../../services/http/http-auth.service";
import { TOKENS } from "../../di/tokens";
import { signUpAction } from "../../store/slices/auth-slice";
import { di } from "../../di/container";
import { UserService } from "../../services/user-services/auth.service";
import NotificationMessage from "../shared/notification-message";
import { IValidation } from "../../models/validation";

function SignUp() {
  const [userRole, setUserRole] = useState("Admin");
  const [userNameValidation, setUserNameValidation] = useState<IValidation>({
    error: false,
    text: "",
  });
  const [passwordValidation, setPasswordValidation] = useState<IValidation>({
    error: false,
    text: "",
  });
  const [emailValidation, setEmailValidation] = useState<IValidation>({
    error: false,
    text: "",
  });

  const dispatch = useDispatch();

  let userService: UserService = di.Resolver(TOKENS.userService) as UserService;

  userService.state = useSelector((store: any) => store["AUTH"].signUp);

  let authService: HttpAuthService = di.Resolver(
    TOKENS.httpAuthService
  ) as HttpAuthService;

  function back() {
    dispatch(navigateAction({ register: false }));
  }

  async function signUp(event: any) {
    event.preventDefault();
    const form_data = new FormData(event.target);
    let isFormValid: boolean = true;
    let user: IUser = {
      username: form_data.get("username"),
      password: form_data.get("password"),
      email: form_data.get("email"),
      role: userRole,
    } as IUser;

    if (user.username === "") {
      isFormValid = false;
      setUserNameValidation({
        error: true,
        text: "User name field is required.",
      });
    }

    if (user.password === "") {
      isFormValid = false;
      setPasswordValidation({
        error: true,
        text: "Password field is required.",
      });
    }

    if (user.email === "") {
      isFormValid = false;
      setEmailValidation({
        error: true,
        text: "Email field is required.",
      });
    }

    if (isFormValid) {
      await authService
        .signUp(user)
        .then((result) => {
          if (result.status === 200) {
            dispatch(signUpAction(result.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserRole((event.target as HTMLInputElement).value);
  };

  return (
    <div className={style.wrapper}>
      <div className={`${style.inner} ${style.myDiv}`}>
        <form onSubmit={signUp}>
          <Box>
            <div style={{ paddingBottom: "30px" }}>
              <TextField
                error={userNameValidation.error}
                fullWidth
                label="User name"
                id="username"
                name="username"
                size="small"
                helperText={userNameValidation.text}
                onChange={(e) => {
                  e.target.value === ""
                    ? setUserNameValidation({
                        error: true,
                        text: "User name field is required.",
                      })
                    : setUserNameValidation({ error: false, text: "" });
                }}
              />
            </div>
            <div style={{ paddingBottom: "30px" }}>
              <TextField
                error={passwordValidation.error}
                fullWidth
                type="password"
                label="Password"
                id="password"
                name="password"
                size="small"
                helperText={passwordValidation.text}
                onChange={(e) => {
                  e.target.value === ""
                    ? setPasswordValidation({
                        error: true,
                        text: "Password field is required.",
                      })
                    : setPasswordValidation({ error: false, text: "" });
                }}
              />
            </div>
            <div style={{ paddingBottom: "30px" }}>
              <TextField
                error={emailValidation.error}
                fullWidth
                label="Email"
                id="email"
                name="email"
                size="small"
                helperText={emailValidation.text}
                onChange={(e) => {
                  e.target.value === ""
                    ? setEmailValidation({
                        error: true,
                        text: "Email field is required.",
                      })
                    : setEmailValidation({ error: false, text: "" });
                }}
              />
            </div>
            <div style={{ paddingBottom: "30px" }}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Role
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={userRole}
                  onChange={handleChange}
                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="User"
                      control={<Radio />}
                      label="User"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="outlined" onClick={back}>
                Back
              </Button>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </div>
          </Box>
        </form>
      </div>
      {userService.Message && (
        <NotificationMessage notific={userService.Message} />
      )}
    </div>
  );
}

export default SignUp;
