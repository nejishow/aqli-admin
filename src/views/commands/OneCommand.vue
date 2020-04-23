<template>
  <div>
    <v-row>
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
      <v-col sm="12">
        <commandHeader></commandHeader>
      </v-col>
      <v-col sm="12">Commande</v-col>
      <v-col sm="12">
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <span class="small">Client: {{ user.name }}</span>
            <span class="small">Addresse: {{ user.address }}</span>
            <span class="small">Numero: {{ user.number }}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="small">ID de la commande: {{ command._id }}</span>
            <span class="small">crée le: {{ command.createdAt }}</span>
            <span class="small">mis à jour le: {{ command.updatedAt }}</span>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-card small class="d-flex justify-space-between">
          <div>
            <v-card-title>Recue : {{ command.received }}</v-card-title>
          </div>
          <div v-show="command.received">
            <v-card-title> Supprimée: {{ !command.enabled }}</v-card-title>
          </div>
          <div v-show="!command.received">
            <v-card-title> Annulée: {{ !command.enabled }}</v-card-title>
          </div>
          <div>
            <v-card-title> Total: {{ command.total }}</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6" v-for="item in command.commands" :key="item._id">
        <v-card class="d-flex flex-column">
          <div class="d-flex justify-space-between m-3">
            <div>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>quantité: {{ item.quantity }}</v-card-subtitle>
              <v-card-text>Prix unitaire: {{ item.price }}</v-card-text>
              <v-card-text>rendu: {{ item.rendu }}</v-card-text>
              <v-card-text>veut le rendre: {{ item.wtgb }}</v-card-text>
              <v-card-text>Garantit: {{ item.garantit }}</v-card-text>
              <v-card-text v-show="command.received"
                >Supprimée: {{ !item.enabled }}</v-card-text
              >
              <v-card-text v-show="!command.received"
                >Annulée: {{ !item.enabled }}</v-card-text
              >
            </div>
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src" :lazy-src="item.src"> </v-img>
              </v-avatar>
            </div>
          </div>
          <div class="d-flex">
            <span
              v-show="item.wtgb && !item.rendu"
              class="m-3 small border bg-danger text-light text-center"
              @click="getBack(item._id)"
            >
              Recuperé sans Comm
            </span>
            <span
              v-show="item.wtgb && !item.rendu"
              class="m-3 small border bg-success text-light text-center"
              @click="getBackComm(item._id)"
            >
              Recuperé avec Comm
            </span>
            <span
              v-show="item.wtgb && !item.rendu"
              class="m-3 small border bg-warning text-center"
              @click="noGetBack(item._id)"
            >
              Non recuperé
            </span>
          </div>
        </v-card>
      </v-col> </v-row
    ><v-row v-show="!command.received && command.enabled">
      <v-col sm="12" md="6">
        <v-row>
          <v-col sm="8">
            <v-text-field
              v-model="code"
              :counter="10"
              :rules="nameRules"
              label="Code de reception"
              required
              width="200"
            ></v-text-field>
          </v-col>
          <v-col sm="3">
            <button class="btn btn-group btn-success" @click="livrer">
              Recu
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import commandService from "../../services/commandService.js";
import userService from "../../services/userService.js";
import commandHeader from "../../components/commandHeader.vue";

export default {
  components: {
    commandHeader
  },
  data() {
    return {
      user: [],
      alert: false,
      alertMessage: "",
      command: [],
      code: "",
      nameRules: [
        v => !!v || "code!!",
        v => (v && v.length <= 10) || "code ne doit pas depassé 10 lettres"
      ]
    };
  },
  created() {
    commandService.getOneCommand(this.$route.params.id).then(async response => {
      this.command = response.data;
      userService.getOneUser(this.command.idUser).then(response => {
        this.user = response.data;
      });
    });
  },
  methods: {
    livrer() {
      commandService
        .deliverCommand(this.command._id, this.code)
        .then(() => {
          this.alertMessage = "Livraison accomplie";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          }, 3000);
        })
        .catch(error => {
          this.alertMessage = error.response.data;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 4000);
        });
    },
    getBack(id) {
      commandService
        .getBack(id)
        .then(() => {
          this.alertMessage = "Produit recuperé";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          });
        })
        .catch(error => {
          this.alertMessage = error.response.data;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 4000);
        });
    },
    getBackComm(id) {
      commandService
        .getBackComm(id)
        .then(() => {
          this.alertMessage = "Produit recuperé";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          });
        })
        .catch(error => {
          this.alertMessage = error.response.data;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 4000);
        });
    },
    noGetBack(id) {
      commandService
        .noGetBack(id)
        .then(() => {
          this.alertMessage = "Operation terminée";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          });
        })
        .catch(error => {
          this.alertMessage = error.response.data;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 4000);
        });
    }
  }
};
</script>
