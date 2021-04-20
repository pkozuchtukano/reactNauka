import useAdminMode from "../../../../hooks/use-admin-mode";
import { DASHBOARD } from "../../../../types/visuals";

export default function Dashboard() {
  useAdminMode(DASHBOARD);
  
  return (
    <div>
      <h1>Hello dashboard !!!</h1>
    </div>
  );
}
