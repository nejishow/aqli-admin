<template>
  <v-bottom-navigation v-model="bottomNav">
    <v-btn value="recent" to="/products">
      <span>Tous les produits</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/newProduct">
      <span>Nouveau produits</span>
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
