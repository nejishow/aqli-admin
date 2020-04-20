<template>
  <v-bottom-navigation v-model="bottomNav">
    <v-btn value="recent" to="/completedCommand">
      <span>Commandes livrées</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/cancelledCommand">
      <span>Commandes annulées</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby" to="/newCommand">
      <span>Nouvelles commandes</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="favorites" to="/commands">
      <span>Toutes les commandes</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data() {
    return {
      bottomNav: "recent"
    };
  }
};
</script>
