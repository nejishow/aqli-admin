<template>
  <v-row>
    <v-col sm="12">
      <productHeader></productHeader>
    </v-col>
    <v-col sm="12">Tous les produits</v-col>
    <v-col sm="12" md="6">
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Recherche"
        solo-inverted
      ></v-autocomplete>
    </v-col>
    <v-col sm="12">
      <v-list
        no-action
        sub-group
        value="true"
        v-for="(product, i) in products"
        :key="i"
        dense
      >
        <v-card>
          <v-list-item
            :to="{
              path: '/product/' + product._id
            }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="product.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import productService from "../../services/productService.js";
import productHeader from "../../components/productHeader.vue";

export default {
  components: {
    productHeader
  },
  data() {
    return {
      products: [],
      productNames:[],
      loading: false,
      items: [],
      search: null,
      select: null
    };
  },
  mounted() {
    productService.getProducts().then(async response => {
      this.products = response.data;
      await this.products.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      await this.products.forEach(element => {
        this.productNames.push(element.name);
      });
    });
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.productNames.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>
