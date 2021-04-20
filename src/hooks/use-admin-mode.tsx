import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAdminMode } from "../actions/visual";
import { AdminMode } from "../types/visuals";

export default function useAdminMode(mode: AdminMode): void {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(setAdminMode({ adminMode: mode }));
  }, [dispatch, mode]);
}
