import { EndPoints } from "../../models/httpEndPoints";
import { IVenue } from "../../models/venue";
import http from "./http-common";

export class HttpVenueService {
  private config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")!)}`,
    },
  };

  public getAllByCategory = (category: string) => {
    return http.get<Array<IVenue>>(
      `${EndPoints.venue.base}${category}/`,
      this.config
    );
  };
}
