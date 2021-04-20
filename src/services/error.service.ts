import appAxios from "../util/api";

class ErrorService {
  logError(error: string, errorInfo: string) {
    appAxios
      .post("log-client-error", {
        error,
        errorInfo,
      })
      .catch(() => {});
  }
}

export default new ErrorService();
