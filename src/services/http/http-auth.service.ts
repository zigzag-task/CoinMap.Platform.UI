import { IUser } from "../../models/auth/auth";
import { EndPoints } from "../../models/httpEndPoints";
import http from "./http-common";

export class HttpAuthService {
  public signIn = async (data: IUser) => {
    return await http.post<any>(`${EndPoints.auth.signIn}`, data);
  };

  public signUp = async (data: IUser) => {
    return await http.post<any>(`${EndPoints.auth.signUp}`, data);
  };
}
