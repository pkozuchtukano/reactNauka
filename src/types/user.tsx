export interface IUserTableRow {
  created: string;
  lastLogin: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  metadata: any;
}

export interface IUserTableFilters {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  created: Date | null;
  createdFormat?: string | null;
  lastLogin: Date | null;
  lastLoginFormat?: string | null;
  sortBy: string | null;
  sortDir: string | null;
}

export interface IUserManageForm {
  id: string | null;
  email: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdministrative: boolean;
}

export const emptyUserManageForm: IUserManageForm = {
  id: "",
  email: "",
  userName: "",
  firstName: "",
  lastName: "",
  isAdministrative: false,
};

export interface IUserResetPasswordForm {
  id: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export const emptyUserChangePasswordForm: IUserResetPasswordForm = {
  id: "",
  password: "",
  confirmPassword: "",
};

export interface IUserDetails {
  id: string;
  email: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  created: string | null;
  lastLogin: string | null;
  lastLoginIp: string | null;
  isEnabled: boolean;
  userAgent: string | null;
  locale: string | null;
  signUpSource: string | null;
  isRemove: boolean;

  geoLite2TimeZone: string | null;
  geoLite2City: string | null;
  geoLite2Country: string | null;
  geoLite2CountryIsoCode: string | null;

  geoIp: string | null;
  geoIpVersion: string | null;
  geoCity: string | null;
  geoRegion: string | null;
  geoRegionCode: string | null;
  geoCountry: string | null;
  geoCountryName: string | null;
  geoCountryCode: string | null;
  geoCountryCodeISO3: string | null;
  geoCountryCapital: string | null;
  geoContinentCode: string | null;
  geoInEu: boolean | null;
  geoPostal: string | null;
  geoLatitude: number | null;
  geoLongitude: number | null;
  geoTimezone: string | null;
  geoUtcOffset: string | null;
  geoCountryCallingCode: string | null;
  geoCurrency: string | null;
  geoCurrencyName: string | null;
  geoLanguagese: string | null;
  geoAsn: string | null;
  geoOrg: string | null;
}
