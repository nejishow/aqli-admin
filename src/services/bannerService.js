import axios from "axios";
const bannerAdmin = axios.create({
  baseURL: "https://aqli-ecommerce.herokuapp.com"
});
bannerAdmin.interceptors.request.use(config => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  postBanner(banner) {
    return bannerAdmin.post("/banner", {
      params: banner
    });
  },
  getBanners() {
    return bannerAdmin.get("/bannersAdmin");
  },
  changeBanner(id) {
    return bannerAdmin.post("/banner/" + id);
  }
};
