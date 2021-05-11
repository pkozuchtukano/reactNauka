import { format, parseISO } from "date-fns";

export const PASSWORD_RGX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
export const PASSWORD_MSG: string = "Hasło musi zawierać 6 znaków w tym jedną dużą literę, jedną małą literę, jeden numer i numeryczny znak specjalny";

export const SERVER_DATE_FORMAT: string = "dd-MM-yyyy";
export const SERVER_DATE_TIME_FORMAT: string = "dd-MM-yyyy HH:mm";

export const APP_DATE_FORMAT: string = "yyyy-MM-dd";
export const APP_DATE_TIME_FORMAT: string = "yyyy-MM-dd HH:mm";

export function formatServerDate(input: Date | null | undefined): string {
  return !input ? "" : format(input, SERVER_DATE_FORMAT);
}

export function formatAppDate(input: string | null | undefined): string {
  return !input ? "" : format(parseISO(input), APP_DATE_FORMAT);
}

export function formatAppDateTime(input: string | null | undefined): string {
  return !input ? "" : format(parseISO(input), APP_DATE_TIME_FORMAT);
}
