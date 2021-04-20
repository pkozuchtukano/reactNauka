import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IUserDetails } from "../../../../../types/user";
import userService from "../../../../../services/user.service";
import Navigation from "../users-navigation-descent.component";
import { formatAppDateTime } from "../../../../../util/formats";
import {
  DetailsBox,
  BoolIndicator,
  PageHeader,
  BackButton,
} from "../../../admin-ui-controls";

interface IUserDetailsParams {
  id: string;
}

export default function DetailsUser() {
  const { id } = useParams<IUserDetailsParams>();
  const [title, setTitle] = useState("");
  const [userData, setUserData] = useState<IUserDetails | null>(null);

  useEffect(() => {
    userService.getDetails(id).then((data) => {
      if (data === null) {
        return;
      }

      setUserData(data);
      setTitle("Szczegóły użytkownika " + data.email);
    });
  }, [id]);

  return (
    <>
      <Navigation title={title} />
      <div className="admin-card">
        <div className="container-fluid">
          <PageHeader title={title} />
          <div className="details-group">
            <div className="details-group__header">Dane podstawowe</div>
            <div className="row">
              <DetailsBox
                label="Nazwa użytkownika"
                value={userData?.userName}
              />
              <DetailsBox label="Email" value={userData?.email} />
              <DetailsBox label="Imię" value={userData?.firstName} />
              <DetailsBox label="Nazwisko" value={userData?.lastName} />
              <DetailsBox
                label="Data utworzenia"
                value={formatAppDateTime(userData?.created)}
              />
              <DetailsBox
                label="Ostatnie logowanie"
                value={formatAppDateTime(userData?.lastLogin)}
              />
              <DetailsBox
                label="Ostatnie logowanie IP"
                value={userData?.lastLoginIp}
              />
              <DetailsBox
                label="Agent przeglądarki"
                value={userData?.userAgent}
              />
              <DetailsBox label="Czy aktywny">
                <BoolIndicator value={userData?.isEnabled} />
              </DetailsBox>
              <DetailsBox label="Czy usunięty">
                <BoolIndicator value={userData?.isRemove} />
              </DetailsBox>
            </div>
          </div>
          <div className="details-group">
            <div className="details-group__header">Dane geo2lite</div>
            <div className="row">
              <DetailsBox
                label="Strefa czasowa"
                value={userData?.geoLite2TimeZone}
              />
              <DetailsBox label="Okolica" value={userData?.geoLite2City} />
              <DetailsBox label="Kraj" value={userData?.geoLite2Country} />
              <DetailsBox
                label="Kod ISO"
                value={userData?.geoLite2CountryIsoCode}
              />
            </div>
          </div>
          <div className="details-group">
            <div className="details-group__header">Dane ipapi</div>
            <div className="row">
              <DetailsBox label="IP" value={userData?.geoIp} />
              <DetailsBox label="Wersja IP" value={userData?.geoIpVersion} />
              <DetailsBox label="Miasto" value={userData?.geoCity} />
              <DetailsBox label="Region" value={userData?.geoRegion} />
              <DetailsBox label="Kod regionu" value={userData?.geoRegionCode} />
              <DetailsBox label="Kraj" value={userData?.geoCountry} />
              <DetailsBox
                label="Nazwa kraju"
                value={userData?.geoCountryName}
              />
              <DetailsBox label="Kod kraju" value={userData?.geoCountryCode} />
              <DetailsBox
                label="Kod kraju ISO"
                value={userData?.geoCountryCodeISO3}
              />
              <DetailsBox label="Stolica" value={userData?.geoCountryCapital} />
              <DetailsBox
                label="Kontynent"
                value={userData?.geoContinentCode}
              />
              <DetailsBox label="Czy w UE?">
                <BoolIndicator value={userData?.geoInEu} />
              </DetailsBox>
              <DetailsBox label="Kod pocztowy" value={userData?.geoPostal} />
              <DetailsBox
                label="Szerokość geograficzna"
                value={userData?.geoLatitude?.toString()}
              />
              <DetailsBox
                label="Długość geograficzna"
                value={userData?.geoLongitude?.toString()}
              />
              <DetailsBox
                label="Strefa czasowa"
                value={userData?.geoTimezone}
              />
              <DetailsBox
                label="Przesunięcie czasowe"
                value={userData?.geoUtcOffset}
              />
              <DetailsBox
                label="Kod kontaktowy kraju"
                value={userData?.geoCountryCallingCode}
              />
              <DetailsBox label="Waluta" value={userData?.geoCurrency} />
              <DetailsBox
                label="Nazwa waluty"
                value={userData?.geoCurrencyName}
              />
              <DetailsBox label="Języki" value={userData?.geoLanguagese} />
              <DetailsBox label="ASN" value={userData?.geoAsn} />
              <DetailsBox label="Dostawca łącza" value={userData?.geoOrg} />
            </div>
          </div>
          <div className="row mt-lg">
            <div className="col-6">
              <BackButton url="/admin/users" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
