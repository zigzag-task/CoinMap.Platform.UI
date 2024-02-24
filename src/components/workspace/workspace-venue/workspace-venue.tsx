import { useEffect, useState } from "react";
import { di } from "../../../di/container";
import { TOKENS } from "../../../di/tokens";
import { HttpVenueService } from "../../../services/http/http-venue.service";
import { ISelectModel } from "../../shared/models/select-model";
import { useDispatch } from "react-redux";
import { venueAction } from "../../../store/slices/venue-slice";
import WorkSpaceVenueList from "./workspace-venue-list/workspace-venue-list";
import { signOutAction } from "../../../store/slices/auth-slice";
import NotificationMessage from "../../shared/notification-message";
import { NotificationType } from "../../../models/notification";
import { Notification } from "../../../models/notification";
import { Messages } from "../../../models/messages";
import { CircularProgress } from "@mui/material";
import style from "./style.module.scss";

function WorkSpaceVenue({ category }: { category: ISelectModel }) {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<Notification>();
  const [load, setLoad] = useState<boolean>(true);

  let venueService: HttpVenueService = di.Resolver(
    TOKENS.httpVenueService
  ) as HttpVenueService;

  useEffect(() => {
    venueService
      .getAllByCategory(category.label)
      .then((result) => {
        if (result.status === 200) {
          dispatch(venueAction(result.data));
        }
        setLoad(false);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          dispatch(signOutAction({}));
        }
        if (error.response?.status === 403) {
          setNotification({
            type: NotificationType.ERROR,
            message: Messages.YouAreNotAuthorized,
          });
        } else {
          setNotification({
            type: NotificationType.ERROR,
            message: Messages.SomethingWentWrong,
          });
        }
        setLoad(false);
        console.log(error);
      });
  }, [category]);

  return (
    <div>
      <WorkSpaceVenueList />
      {notification && <NotificationMessage notific={notification} />}
      {load && (
        <div className={style.load}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default WorkSpaceVenue;
