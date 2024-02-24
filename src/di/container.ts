import { createContainer, Container } from "brandi";
import { useInjection } from "brandi-react";
import { TOKENS } from "./tokens";
import { TokenValue } from "brandi";
import { HttpAuthService } from "../services/http/http-auth.service";
import { UserService } from "../services/user-services/auth.service";
import { HttpCategoryService } from "../services/http/http-category.service";
import { HttpVenueService } from "../services/http/http-venue.service";

function Register(): Container {
  const container = createContainer();

  container
    .bind(TOKENS.httpAuthService)
    .toInstance(HttpAuthService)
    .inTransientScope();

  container
    .bind(TOKENS.httpCategoryService)
    .toInstance(HttpCategoryService)
    .inTransientScope();

  container
    .bind(TOKENS.httpVenueService)
    .toInstance(HttpVenueService)
    .inTransientScope();

  container.bind(TOKENS.userService).toInstance(UserService).inTransientScope();

  return container;
}

function Resolver<T extends TokenValue<unknown>>(token: T): any {
  const obj = useInjection(token);

  return obj;
}

// https://brandi.js.org/brandi-react
export const di = {
  Register,
  Resolver,
};
