import axios from "axios";
const productAdmin = axios.create({
  baseURL: "http://localhost:3000"
});
productAdmin.interceptors.request.use(config => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  postProduct(product) {
    return productAdmin.post("/productAdmin", {
      params: product
    });
  },
  getProducts() {
    return productAdmin.get("/allProductAdmin");
  },
  getOneProduct(id) {
    return productAdmin.get("/product/" + id);
  },
  getOneBoutique(id) {
    return productAdmin.get("/boutique/" + id);
  },
  getAllBoutique() {
    return productAdmin.get("/allBoutique");
  }
};
