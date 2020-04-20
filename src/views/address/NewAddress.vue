<template>
  <div>
    <v-row>
      <v-col>
        <addressHeader></addressHeader>
      </v-col>
      <v-col sm="12">Nouvel Addresse</v-col>
      <v-col sm="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="nameRules"
            v-model="name"
            label="Nom du quartier"
            required
          ></v-text-field>
          <v-row>
            <v-col sm="12" md="6">
              <v-list dense>
                <v-list-item v-for="(point, index) in points" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ point.point }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col sm="12" md="6">
              <div class="d-flex">
                <v-text-field
                  label="Nouveau point"
                  v-model="point"
                ></v-text-field>
                <span class="input-group-text" @click="addPoint">
                  <v-icon>mdi-plus</v-icon>
                </span>
              </div>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Sauvegarder
          </v-btn>
        </v-form>
        <v-alert
          :value="alert"
          color="pink"
          dark
          border="top"
          icon="mdi-home"
          transition="scale-transition"
        >
          <v-subheader>Quartier: {{ address.name }}</v-subheader>
          <v-list dense>
            <v-list-item v-for="(point, index) in address.points" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ point.point }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-alert>
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
      name: "",
      alert: false,
      point: "",
      points: [],
      address: [],
      valid: true,
      nameRules: [v => !!v || "Le nom complet est obligatoire"],
      cntPoint: 1
    };
  },
  mounted() {},
  methods: {
    addPoint() {
      this.points.push({ point: this.point });
      this.point = "";
    },
    validate() {
      this.$refs.form.validate();
      addressService
        .addAddresse({ name: this.name, points: this.points })
        .then(response => {
          this.name = "";
          this.points = [];
          this.address = response.data;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
