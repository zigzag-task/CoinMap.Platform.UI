import { Box, CircularProgress } from "@mui/material";
import { di } from "../../di/container";
import { TOKENS } from "../../di/tokens";
import { HttpCategoryService } from "../../services/http/http-category.service";
import ComboBox from "../shared/combo-box";
import { ISelectModel } from "../shared/models/select-model";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import WorkSpaceVenue from "./workspace-venue/workspace-venue";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../store/slices/auth-slice";
import NotificationMessage from "../shared/notification-message";
import { NotificationType } from "../../models/notification";
import { Notification } from "../../models/notification";
import { Messages } from "../../models/messages";

function WorkSpace() {
  const dispatch = useDispatch();

  const [selectModelList, setSelectModelList] = useState<ISelectModel[]>();
  const [category, setCategory] = useState<ISelectModel>();
  const [notification, setNotification] = useState<Notification>();
  const [load, setLoad] = useState<boolean>(true);

  let categoryService: HttpCategoryService = di.Resolver(
    TOKENS.httpCategoryService
  ) as HttpCategoryService;

  useEffect(() => {
    var selectModel: ISelectModel[] = [];

    categoryService
      .getAll()
      .then((result) => {
        if (result.status === 200) {
          result.data.forEach((item: any, index: number) => {
            selectModel.push({
              label: item.category,
              value: index,
            });
          });

          setSelectModelList(selectModel);
          setLoad(false);
        }
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
  }, []);

  function _onChangeValue(value: ISelectModel | null) {
    if (value !== null) {
      setCategory(value);
    }
  }

  return (
    <div className={style.wrapper}>
      <div>
        <Box>
          {selectModelList && (
            <ComboBox
              options={selectModelList}
              onChangeValue={_onChangeValue}
            />
          )}

          {category && <WorkSpaceVenue category={category} />}
        </Box>
      </div>
      {notification && (
        <NotificationMessage
          notific={notification}
          position={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
      {load && (
        <div className={style.load}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default WorkSpace;
