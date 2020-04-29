<template>
  <div>
    <v-row>
      <v-col>
        <categoryHeader></categoryHeader>
      </v-col>
      <v-col sm="12">Toues les categories</v-col>
      <v-col sm="12">
        {{ allCategory }}
      </v-col>
    </v-row>
  </div>
</template>
<script>
import categoryService from "../../services/categoryService.js";
import categoryHeader from "../../components/categoryHeader.vue";
export default {
  components: {
    categoryHeader
  },
  data() {
    return {
      allCategory: []
    };
  },
  mounted() {
    categoryService.getAllCategory().then(async response => {
      this.allCategory = response.data;
    });
  },
  methods: {}
};
</script>
