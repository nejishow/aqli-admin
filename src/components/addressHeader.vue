<template>
  <v-bottom-navigation v-model="bottomNav">
    <v-btn value="recent" to="/newAddress">
      <span>Nouvel addresse</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/newPoint">
      <span>Nouveau point</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby" to="/suppAddress">
      <span>Supprimer</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="favorites" to="/enableAddress">
      <span>Activer</span>
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
