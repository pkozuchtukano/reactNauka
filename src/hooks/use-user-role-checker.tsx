import { useMemo } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { UserRoleType } from "../types/auth";

export default function useUserRoleChecker(role: UserRoleType): boolean {
  const userToken = useSelector((state: any) => state.auth.userToken);
  const decoded: any = useMemo(() => userToken ? jwt_decode(userToken) : null, [userToken]);
  if (!decoded) {
    return false;
  }

  const roles: string | string[] =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (!roles) {
    return false;
  }

  return roles === role || roles.indexOf(role) !== -1;
}
