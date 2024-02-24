import { EndPoints } from "../../models/httpEndPoints";
import http from "./http-common";

export class HttpCategoryService {
  private config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")!)}`,
    },
  };

  public getAll = () => {
    return http.get<any>(`${EndPoints.category.base}`, this.config);
  };
}
