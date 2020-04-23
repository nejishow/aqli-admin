import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/users/Users.vue";
import Commandes from "../views/commands/Commandes.vue";
import NewCommand from "../views/commands/NewCommand.vue";
import CanceledCommand from "../views/commands/CanceledCommand.vue";
import Completed from "../views/commands/Completed.vue";
import Ventes from "../views/Ventes.vue";
import Login from "../views/Login.vue";
import Address from "../views/address/Addresse.vue";
import NewAddress from "../views/address/NewAddress.vue";
import NewPoint from "../views/address/NewPoint.vue";
import SupprimerAddress from "../views/address/Supprimer.vue";
import EnableAddress from "../views/address/EnableAddress.vue";
import OneCommand from "../views/commands/OneCommand.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/commandes",
    name: "commandes",
    component: Commandes
  },
  {
    path: "/ventes",
    name: "ventes",
    component: Ventes
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/address",
    name: "address",
    component: Address
  },
  {
    path: "/newAddress",
    name: "newAddress",
    component: NewAddress
  },
  {
    path: "/newPoint",
    name: "newPoint",
    component: NewPoint
  },
  {
    path: "/suppAddress",
    name: "supAddress",
    component: SupprimerAddress
  },
  {
    path: "/enableAddress",
    name: "enableAddress",
    component: EnableAddress
  },
  {
    path: "/newCommand",
    name: "newCommand",
    component: NewCommand
  },
  {
    path: "/completedCommand",
    name: "completedCommand",
    component: Completed
  },
  {
    path: "/cancelledCommand",
    name: "cancelledCommand",
    component: CanceledCommand
  },
  {
    path: "/commands",
    name: "commands",
    component: Commandes
  },
  {
    path: "/command/:id",
    name: "command",
    component: OneCommand
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
