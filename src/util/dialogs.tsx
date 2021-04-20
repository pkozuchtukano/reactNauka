import alertify from "alertifyjs";

export function confirm(
  title: string,
  body: string,
  success?: Function,
  cancel?: Function
) {
  alertify
    .confirm(title, body, success, cancel)
    .set("labels", { ok: "Ok", cancel: "Anuluj" });
}
