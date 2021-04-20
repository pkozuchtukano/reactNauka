import Media from "react-media";
import config from "react-global-configuration";
import { IUserTableRow } from "../../../../../types/user";
import { IPagination } from "../../../../../types/util";
import { UsersDekstopCollection } from "./desktop-collection.component";
import { UsersMobileCollection } from "./mobile-collection.component";
import { confirm } from "../../../../../util/dialogs";
import userCommonService from "../../../../../services/user-common.service";

interface IUserTableProps {
  paginationData: IPagination<IUserTableRow> | null;
  refreshCounter: number;
  setRefreshCounter: Function;
}

export default function UsersCollection(props: IUserTableProps) {
  const resolutionBreak: number = config.get("resolutionBreakPx");
  const { refreshCounter, setRefreshCounter } = props;

  const toggleActivityConfirm = (user: IUserTableRow) => {
    const question = user.metadata.isEnabled
      ? "Czy na pewno chcesz zablokować użytkownika "
      : "Czy na pewno chcesz odblokować użytkownika ";
    confirm("Potwierdzenie", question + user.email + "?", () => {
      userCommonService.toggleActivity(user.metadata.id).then((data) => {
        setRefreshCounter(refreshCounter + 1);
      });
    });
  };

  const removeConfirm = (user: IUserTableRow) => {
    confirm(
      "Potwierdzenie",
      "Czy na pewno chcesz usunąć użytkownika " + user.email + "?",
      () => {
        userCommonService.delete(user.metadata.id).then((data) => {
          setRefreshCounter(refreshCounter + 1);
        });
      }
    );
  };

  return (
    <Media queries={{ small: { maxWidth: resolutionBreak } }}>
      {(matches) =>
        matches.small ? (
          <UsersMobileCollection
            {...props}
            toggleActivityConfirm={toggleActivityConfirm}
            removeConfirm={removeConfirm}
          />
        ) : (
          <UsersDekstopCollection
            {...props}
            toggleActivityConfirm={toggleActivityConfirm}
            removeConfirm={removeConfirm}
          />
        )
      }
    </Media>
  );
}
