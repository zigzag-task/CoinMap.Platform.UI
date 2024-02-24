import { useState } from "react";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import SignIn from "./components/sign-in/sign-in";
import { useSelector } from "react-redux";
import WorkSpace from "./components/workspace/workspace";
import { TOKENS } from "./di/tokens";
import { di } from "./di/container";
import { UserService } from "./services/user-services/auth.service";
import SignUp from "./components/sign-up/sign-up";
import NotificationMessage from "./components/shared/notification-message";

function App() {
  let userService: UserService = di.Resolver(TOKENS.userService) as UserService;

  userService.state = useSelector((store: any) => store["AUTH"].signIn);

  const navigate = useSelector((store: any) => store["PAGE"].navigate);

  return (
    <div className="background">
      <div className="container">
        <Header IsAuthenticated={userService.IsAuthenticated()} />
        {!userService.IsAuthenticated() ? (
          !navigate?.register ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        ) : (
          <WorkSpace />
        )}
        <Footer />
      </div>
      {userService.Message && (
        <NotificationMessage notific={userService.Message} />
      )}
    </div>
  );
}

export default App;
