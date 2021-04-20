import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearAdminMode } from "../actions/visual";

export default function useClearAdminMode(): void {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(clearAdminMode());
  }, [dispatch]);
}
