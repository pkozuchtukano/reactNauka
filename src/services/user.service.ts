import appAxios from "../util/api";
import {
  IUserTableRow,
  IUserTableFilters,
  IUserManageForm,
  IUserDetails,
} from "../types/user";
import { IPagination } from "../types/util";
import { messageSender } from "../util/messages";
import { formatServerDate } from "../util/formats";

const API_URL = "users/";

class UserService {
  getUsers(
    page: number,
    pageSize: number,
    tableFilters: IUserTableFilters | null
  ) {
    if (tableFilters) {
      tableFilters.createdFormat = formatServerDate(tableFilters?.created);
      tableFilters.lastLoginFormat = formatServerDate(tableFilters?.lastLogin);
    }

    return appAxios
      .post(API_URL + "all", {
        page,
        pageSize,
        filters: tableFilters,
      })
      .then(
        (response) => {
          return Promise.resolve<IPagination<IUserTableRow>>(response.data);
        },
        (error) => {
          messageSender.apiError(error);
          return Promise.resolve<null>(null);
        }
      );
  }

  add(formData: IUserManageForm) {
    return appAxios
      .post(API_URL + "add", {
        ...formData,
      })
      .then(
        (response) => {
          messageSender.success("Użytkownik został dodany", "admin-user-add");
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "admin-user-add");
          return Promise.reject();
        }
      );
  }

  edit(formData: IUserManageForm, id: string | undefined) {
    return appAxios
      .put(API_URL + "edit", {
        id,
        ...formData,
      })
      .then(
        (response) => {
          messageSender.success(
            "Użytkownik pomyśnie edytowany",
            "admin-user-edit"
          );
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "admin-user-edit");
          return Promise.reject();
        }
      );
  }

  getEditModel(id: string) {
    return appAxios
      .get(API_URL + "get-edit-model", {
        params: {
          id,
        },
      })
      .then(
        (response) => {
          const data: IUserManageForm = response.data;
          data.firstName = data.firstName || "";
          data.lastName = data.lastName || "";

          return Promise.resolve<IUserManageForm>(data);
        },
        (error) => {
          messageSender.apiError(error);
          return Promise.resolve<null>(null);
        }
      );
  }

  getDetails(id: string) {
    return appAxios
      .get<IUserDetails>(API_URL + "details", {
        params: {
          id,
        },
      })
      .then(
        (response) => Promise.resolve<IUserDetails>(response.data),
        (error) => {
          messageSender.apiError(error);
          return Promise.resolve<null>(null);
        }
      );
  }
}

export default new UserService();
