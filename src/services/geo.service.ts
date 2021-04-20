import axios from "axios";

const IPAPI_URL = "https://ipapi.co/json/";

class GeoService {
  getUserGeo() {
    return axios.get(IPAPI_URL).then((response) => response.data);
  }
}

export default new GeoService();
