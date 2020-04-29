<template>
  <div>
    <v-row>
      <v-col sm="12">Clients</v-col>
      <v-col sm="12" md="5">
        <v-list dense shaped outlined rounded>
          <v-list-item v-for="(user, index) in users" :key="index">
            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="user.address"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="user.number"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import userService from "../../services/userService.js";
export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    userService.getUsers().then(async response => {
      this.users = response.data;
    });
  },
  methods: {}
};
</script>
