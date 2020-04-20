<template>
  <div>
    <v-row>
      <v-col>
        <addressHeader></addressHeader>
      </v-col>
      <v-col sm="12">Addresses</v-col>
      <v-col sm="12">
        <v-list-group
          no-action
          sub-group
          value="true"
          v-for="(address, i) in allAddress"
          :key="i"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ address.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list
            v-for="(point, index) in address.points"
            :key="index"
            :color="address.enabled ? 'blue' : 'pink'"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="point.point"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-group>
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
