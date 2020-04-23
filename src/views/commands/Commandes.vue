<template>
  <v-row>
    <v-col sm="12">
      <commandHeader></commandHeader>
    </v-col>
    <v-col sm="12">Commandes</v-col>
    <v-col sm="12">
      <v-list
        no-action
        sub-group
        value="true"
        v-for="(command, i) in commands"
        :key="i"
      >
        <v-card
          :to="{
            path: '/command/' + command._id
          }"
          :class="[!command.enabled && !command.received ? 'bg-danger ' : '']"
        >
          <v-subheader>{{ command.createdAt }}</v-subheader>

          <v-list-item
            v-for="(item, index) in command.commands"
            :key="index"
            :class="[!item.enabled && !command.received ? 'bg-danger ' : '']"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title
                >quantité: {{ item.quantity }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title
                v-show="item.wtgb && !item.rendu"
                class="text-danger h1"
              >
                Retour demandé</v-list-item-title
              >
              <v-list-item-title
                v-show="item.wtgb && item.rendu"
                class="text-danger h1"
              >
                Retour effectué</v-list-item-title
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
  created() {
    commandService.getCommands().then(async response => {
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
