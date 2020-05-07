import axios from "axios";
const addressClient = axios.create({
  baseURL: "https://aqli-ecommerce.herokuapp.com"
});
addressClient.interceptors.request.use(config => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  addAddresse(address) {
    return addressClient.post("/address", {
      params: {
        address
      }
    });
  },
  addPoints(id, points) {
    return addressClient.post("/address/" + id, {
      params: {
        points
      }
    });
  },
  getOneAddress(id) {
    return addressClient.get("/address/" + id);
  },
  getAllAddress() {
    return addressClient.get("/alladdressAdmin");
  }
};
