<template>
  <v-row>
    <v-col sm="12">
      <commandHeader></commandHeader>
    </v-col>
    <v-col sm="12">Livraison terminée</v-col>
    <v-col sm="12">
      <v-list
        no-action
        sub-group
        value="true"
        v-for="(command, i) in commands"
        :key="i"
        dense
      >
        <v-card
          :to="{
            path: '/command/' + command._id
          }"
        >
          <div class="d-flex">
            <span class="small">Commandé le: {{ command.createdAt }} | </span>
            <span class="small"> Recu le: {{ command.createdAt }}</span>
          </div>

          <v-list-item
            v-for="(item, index) in command.commands"
            :key="index"
            :color="item.enabled ? 'blue' : 'pink'"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title
                >quantité: {{ item.quantity }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import commandService from "../../services/commandService.js";
import commandHeader from "../../components/commandHeader.vue";

export default {
  components: {
    commandHeader
  },
  data() {
    return {
      commands: []
    };
  },
  mounted() {
    commandService.getCompletedCommand().then(async response => {
      this.commands = response.data;
      await this.commands.sort((a, b) => {
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
  methods: {}
};
</script>
