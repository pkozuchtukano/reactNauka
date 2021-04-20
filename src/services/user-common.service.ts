import appAxios from "../util/api";
import { messageSender } from "../util/messages";

const API_URL = "common-user-actions/";

class UserCommonService {
  resetPassword(userId: string, password: string) {
    return appAxios
      .put(API_URL + "reset-password", {
        userId,
        password,
      })
      .then(
        (response) => {
          messageSender.success(
            "Pomyślnie zmieniono hasło użytkownika",
            "admin-user-reset-password"
          );
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "admin-user-reset-password");
          return Promise.reject();
        }
      );
  }

  toggleActivity(id: string) {
    return appAxios
      .put(API_URL + "toggle-activity", {
        id,
      })
      .then(
        (response) => {
          messageSender.success("Pomyślnie zmieniono status użytkownika");
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error);
          return Promise.reject();
        }
      );
  }

  delete(id: string) {
    return appAxios
      .delete(API_URL + "delete", {
        data: {
          id,
        },
      })
      .then(
        (response) => {
          messageSender.success("Pomyślnie usunięto użytkownika");
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error);
          return Promise.reject();
        }
      );
  }
}

export default new UserCommonService();
