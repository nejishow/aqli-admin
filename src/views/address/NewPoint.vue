<template>
  <div>
    <v-row>
      <v-col>
        <addressHeader></addressHeader>
      </v-col>
      <v-col sm="12">Nouveau point</v-col>
      <v-alert
        :value="alert"
        color="pink"
        dark
        border="top"
        icon="mdi-home"
        transition="scale-transition"
      >
        <v-subheader>Quartier: {{ confirmation.name }}</v-subheader>
        <v-list dense>
          <v-list-item
            v-for="(point, index) in confirmation.points"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ point.point }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-alert>
      <v-col sm="12" md="5">
        <v-list dense shaped outlined rounded>
          <v-list-item
            v-for="(address, index) in allAddress"
            :key="index"
            @click="select(address)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ address.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col sm="12" md="5" v-if="isSelected">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <v-subheader>{{ address.name }}</v-subheader>
            <v-text-field
              label="Nouveau point de livraison"
              v-model="point"
              required
            ></v-text-field>
            <span class="input-group-text" @click="addPoint">
              <v-icon>mdi-plus</v-icon>
            </span>
          </div>
          <v-btn :disabled="!valid" color="info" @click="validate">
            Sauvegarder
          </v-btn>

          <v-list dense nav>
            <v-list-item v-for="(point, index) in points" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ point.point }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import addressService from "../../services/addressService.js";
import addressHeader from "../../components/addressHeader.vue";
export default {
  components: {
    addressHeader
  },
  data() {
    return {
      allAddress: [],
      alert: false,
      point: "",
      points: [],
      address: "",
      nameRules: [v => !!v || "Ne peut etre vide"],
      valid: true,
      isSelected: false, // si le quartier a eté selectionné
      confirmation: ""
    };
  },
  methods: {
    addPoint() {
      this.points.push({ point: this.point });
      this.point = "";
    },
    select(address) {
      this.address = address;
      this.isSelected = true;
    },
    validate() {
      addressService.addPoints(this.address._id, this.points).then(response => {
        this.isSelected = false;
        this.points = [];
        this.point = "";
        this.address = "";
        this.confirmation = response.data;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    }
  },
  mounted() {
    addressService.getAllAddress().then(async response => {
      this.allAddress = response.data;
    });
  }
};
</script>
