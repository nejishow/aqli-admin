<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense nav>
        <v-list-item router exact to="/">
          <v-list-item-content>
            <v-list-item-title>Acceuil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/users">
          <v-list-item-content>
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/newCommand">
          <v-list-item-content>
            <v-list-item-title>Commandes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/ventes">
          <v-list-item-content>
            <v-list-item-title>Ventes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/address">
          <v-list-item-content>
            <v-list-item-title>Points de livraison</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/products">
          <v-list-item-content>
            <v-list-item-title>Produits</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId" router exact to="/allCategory">
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!getId" router exact to="/login">
          <v-list-item-content>
            <v-list-item-title>Connection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getId">
          <v-list-item-content @click="logout">
            <v-list-item-title>Deconnection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      fixed: true,
      clipped: true,
      miniVariant: false,
      title: "Vuetify.js",
      outline: true,
      right: true,
      rightDrawer: false
    };
  },
  async mounted() {
    await this.$store.dispatch("getUser");
  },
  computed: {
    getId() {
      return this.$store.state.user.id;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.go();
      });
    }
  }
};
</script>
