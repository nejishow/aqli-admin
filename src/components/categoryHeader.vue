<template>
  <v-bottom-navigation v-model="bottomNav">
    <v-btn value="recent" to="/allCategory">
      <span>Toutes les categories</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn value="recent" to="/newCategory">
      <span>Nouvelle Categorie</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn value="nearby" to="/suppCategory">
      <span>Supprimer</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="favorites" to="/enableCategory">
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
