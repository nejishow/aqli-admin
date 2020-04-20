<template>
  <div>
    <v-row>
      <v-col>
        <addressHeader></addressHeader>
      </v-col>
      <v-col sm="12">Activer Addresse</v-col>
      <v-col sm="12">{{ allAddress }}</v-col>
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
      allAddress: []
    };
  },
  mounted() {
    addressService.getAllAddress().then(async response => {
      this.allAddress = response.data;
    });
  },
  methods: {}
};
</script>
