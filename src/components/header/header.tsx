import { Button } from "@mui/material";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../store/slices/auth-slice";

function Header({ IsAuthenticated }: { IsAuthenticated: boolean }) {
  const dispatch = useDispatch();

  function signOut() {
    dispatch(signOutAction({}));
  }
  return (
    <div className={style.header}>
      {IsAuthenticated && (
        <Button
          variant="contained"
          style={{ position: "absolute", right: "0", bottom: "20px" }}
          onClick={signOut}
        >
          Sign Out
        </Button>
      )}
    </div>
  );
}

export default Header;
