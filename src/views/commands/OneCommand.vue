<template>
  <div>
    <v-row>
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
        <v-card class="d-flex justify-space-between">
          <div>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>quantité: {{ item.quantity }}</v-card-subtitle>
            <v-card-text>Prix unitaire: {{ item.price }}</v-card-text>
            <v-card-text>rendu: {{ item.rendu }}</v-card-text>
            <v-card-text>veut le rendre: {{ item.wtgb }}</v-card-text>
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
            <button class="btn btn-group btn-success">Recu</button>
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
      command: [],
      code: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
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
  methods: {}
};
</script>
