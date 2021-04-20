import useUserIdentity from "./use-user-identity";

export default function useUserAuth(): boolean {
  const userIdentity = useUserIdentity();

  return !!userIdentity.userName;
}
