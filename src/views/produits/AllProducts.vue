<template>
  <div class="row">
    <div class="col-sm-12">
      <productHeader></productHeader>
    </div>
    <div class="col-sm-12">Tous les produits</div>
    <div class="col-sm-4 col-md-2">
      <v-btn @click="tout" small>Tous</v-btn>
    </div>
    <div class="col-sm-8 col-md-4">
      <v-select
        item-text="name"
        item-value="_id"
        :items="allBoutique"
        v-model="boutique"
        label="Boutique"
        placeholder="Tous"
      ></v-select>
    </div>
    <div class="col-sm-12 col-md-6">
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        item-text="name"
        hide-no-data
        hide-details
        label="Recherche"
        solo-inverted
        return-object
        @input="value($event)"
      ></v-autocomplete>
    </div>
    <div class="col-sm-12">
      <v-list
        no-action
        sub-group
        value="true"
        v-for="(product, i) in choice"
        :key="i"
        dense
      >
        <v-list-item
          :to="{
            path: '/product/' + product._id
          }"
          class="border-bottom"
        >
          <v-avatar tile width="200" height="200">
            <v-img :src="product.pics[0].src"></v-img>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="product.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="product.price"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
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
      productNames: [],
      allBoutique: [],
      boutique: "",
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
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      await this.products.forEach(element => {
        this.productNames.push(element.name);
      });
    });
    productService.getAllBoutique().then(res => {
      this.allBoutique = res.data;
    });
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  computed: {
    choice() {
      if (this.boutique !== "") {
        var items = this.products.filter(product => {
          return product.owner == this.boutique;
        });
        return items;
      }
      return this.products;
    }
  },
  methods: {
    tout() {
      this.boutique = "";
    },
    value(item) {
      this.$router.push("/product/" + item._id);
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.products.filter(e => {
          return (
            (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>
