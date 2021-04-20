import GeoService from "./geo.service";
import appAxios from "../util/api";
import { messageSender } from "../util/messages";

const API_URL = "auth/";

class AuthService {
  login(email: string, password: string) {
    return appAxios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        return response.data.token;
      });
  }

  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
  }

  register(email: string, password: string) {
    return GeoService.getUserGeo()
      .then((geoData) => {
        const userData = { email, password, ...geoData };
        return this.registerUser(userData);
      })
      .catch(() => this.registerUser({ email, password }));
  }

  registerUser(userData: Object) {
    return appAxios.post(API_URL + "register", userData);
  }

  confirmAccount(userId: string, code: string) {
    return appAxios.post(API_URL + "confirm-account", {
      userId,
      code,
    });
  }

  resetPassword(email: string) {
    return appAxios
      .post(API_URL + "reset-password", {
        email,
      })
      .then(
        (response) => {
          messageSender.success(
            "Na wskazany adres email została wysłana wiadomość umożliwiająca wykonanie zmiany hasła.",
            "reset-password"
          );
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "reset-password");
          return Promise.reject();
        }
      );
  }

  changePassword(password: string, userId: string, code: string) {
    return appAxios
      .post(API_URL + "confirm-reset-password", {
        password,
        userId,
        code,
      })
      .then(
        (response) => {
          messageSender.success(
            "Hasło zostało zmienione.",
            "confirm-reset-password"
          );
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "confirm-reset-password");
          return Promise.reject();
        }
      );
  }

  changeUserPassword(currentPassword: string, newPassword: string) {
    return appAxios
      .post(API_URL + "change-password", {
        currentPassword,
        newPassword,
      })
      .then(
        (response) => {
          messageSender.success("Hasło zostało zmienione.");
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error);
          return Promise.reject();
        }
      );
  }

  confirmInvitation(password: string, userId: string, code: string) {
    return appAxios
      .post(API_URL + "confirm-invite", {
        password,
        userId,
        code,
      })
      .then(
        (response) => {
          messageSender.success(
            "Konto zostało potwierdzone. Możesz się zalogować.",
            "confirm-invitation"
          );
          return Promise.resolve();
        },
        (error) => {
          messageSender.apiError(error, "confirm-invitation");
          return Promise.reject();
        }
      );
  }
}

export default new AuthService();
