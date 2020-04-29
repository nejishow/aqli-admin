import axios from "axios";
const categoryAdmin = axios.create({
  baseURL: "http://localhost:3000"
});
categoryAdmin.interceptors.request.use(config => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  getAllCategory() {
    return categoryAdmin.get("/allCategory");
  },
  getAllSubcategory() {
    return categoryAdmin.get("/allSubCategory");
  },
  getAllProductType() {
    return categoryAdmin.get("/allProductType");
  },
  getOnecategory(id) {
    return categoryAdmin.get("/category/" + id);
  },
  getOneSubCategory(id) {
    return categoryAdmin.get("/subcat/" + id);
  },
  addOneCategory(cat) {
    return categoryAdmin.post("/category", {
      params: cat
    })
  },
  addOneSub(sub) {
    return categoryAdmin.post("/subCategory", {
      params: sub
    })
  },
  addOneProd(prod) {
    return categoryAdmin.post("/productType", {
      params: prod
    })
  }
};
