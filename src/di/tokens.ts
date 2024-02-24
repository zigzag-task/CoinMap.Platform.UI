import { token } from "brandi";
import { HttpAuthService } from "../services/http/http-auth.service";
import { UserService } from "../services/user-services/auth.service";
import { HttpCategoryService } from "../services/http/http-category.service";
import { HttpVenueService } from "../services/http/http-venue.service";

export const TOKENS = {
  httpAuthService: token<HttpAuthService>("HttpAuthService"),
  httpCategoryService: token<HttpCategoryService>("HttpCategoryService"),
  httpVenueService: token<HttpVenueService>("HttpVenueService"),
  userService: token<UserService>("UserService"),
};
