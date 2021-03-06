import axios from "axios";
const commandAdmin = axios.create({
  baseURL: "https://aqli-ecommerce.herokuapp.com"
});
commandAdmin.interceptors.request.use(config => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  getCommands() {
    return commandAdmin.get("/adminCommands");
  },
  getNewCommands() {
    return commandAdmin.get("/newCommand");
  },
  getCancelledCommand() {
    return commandAdmin.get("/cancelledCommand");
  },
  getCompletedCommand() {
    return commandAdmin.get("/completedCommand");
  },
  getOneCommand(id) {
    return commandAdmin.get("/command/" + id);
  },
  deliverCommand(id, code) {
    return commandAdmin.patch("/command/" + id, {
      params: code
    });
  },
  cancelOneItem(id) {
    return commandAdmin.post("/commandItem/" + id);
  },
  getBack(id) {
    return commandAdmin.post("/getBackAdmin/" + id);
  },
  getBackComm(id) {
    return commandAdmin.post("/getBackAdminWithComm/" + id);
  },
  noGetBack(id) {
    return commandAdmin.post("/noGetBackAdmin/" + id);
  },
  supAll(id) {
    return commandAdmin.post("/supCommand/" + id);
  },
  sup(id) {
    return commandAdmin.post("/supItem/" + id);
  }
};
