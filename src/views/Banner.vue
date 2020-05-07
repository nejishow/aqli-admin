<template>
  <div>
    <v-row>
      <v-col v-if="alert">
        <v-alert
          :value="alert"
          close-text="Fermer"
          color="pink"
          dark
          border="top"
          icon="mdi-home"
          transition="scale-transition"
          style="position: fixed; z-index: 999"
        >
          <h3>{{ alertMessage }}</h3>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" class="d-flex flex-column">
        <h5>Banniere</h5>
        <div v-for="(banner, i) in banners" :key="i">
          <div class="d-flex">
            <v-avatar tile height="100" width="200">
              <v-img :src="banner.src"> </v-img>
            </v-avatar>
            <v-btn
              v-if="banner.enabled"
              width="50"
              color="error"
              @click="changeBanner(banner._id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              v-else
              width="50"
              color="success"
              @click="changeBanner(banner._id)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col sm="12" md="6">
        <div class="d-flex flex-column">
          <FirebaseUpload :isBanner="true"></FirebaseUpload>
          <v-img :src="srcImg"></v-img>
          <v-btn width="100" color="info" @click="upBanner">Publier</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import bannerService from "../services/bannerService.js";
import FirebaseUpload from "../components/FirebaseUpload.vue";

export default {
  components: {
    FirebaseUpload
  },
  data() {
    return {
      banners: [],
      alertMessage: "",
      alert: false
    };
  },
  mounted() {
    bannerService.getBanners().then(async response => {
      this.banners = response.data;
      await this.banners.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    });
  },
  computed: {
    srcImg() {
      return this.$store.state.src;
    }
  },
  methods: {
    upBanner() {
      bannerService
        .postBanner({ src: this.srcImg })
        .then(() => {
          this.alertMessage = "Banner ajouté!";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go("/banner");
          }, 3000);
        })
        .catch(() => {
          this.alertMessage = "Banner non ajouté!";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
    },
    changeBanner(id) {
      bannerService
        .changeBanner(id)
        .then(() => {
          this.alertMessage = "Banniere modifiée!";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go("/banner");
          }, 3000);
        })
        .catch(() => {
          this.alertMessage = "Banner non modifiée!";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
    }
  }
};
</script>
