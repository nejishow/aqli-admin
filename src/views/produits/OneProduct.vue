<template>
  <div>
    <v-row>
      <v-col sm="12">
        <productHeader></productHeader>
      </v-col>
    </v-row>
    <v-row v-show="!modify">
      <v-col sm="12"
        ><div class="d-flex justify-space-between">
          <h3>Description du produit</h3>
          <v-btn color="purple" class="text-light" @click="modify = true"
            >Modifier</v-btn
          >
        </div></v-col
      >
      <v-col sm="12" md="6">
        <v-list no-action sub-group value="true" dense>
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nom: {{ product.name }}</v-list-item-title>
                <v-list-item-title v-if="product.enabled"
                  >Disponible</v-list-item-title
                >
                <v-list-item-title v-if="!product.enabled"
                  >Rupture de stock</v-list-item-title
                >
                <v-list-item-title
                  >Prix: {{ product.price }} Fdj</v-list-item-title
                >
                <v-list-item-title
                  >Mots clés: {{ product.keywords }}</v-list-item-title
                >
                <v-list-item-title>
                  Couleurs:
                  <v-list
                    v-for="(color, index) in product.Couleurs"
                    :key="index"
                  >
                    <v-list-item>
                      <v-list-item-title>{{
                        item.color
                      }}</v-list-item-title></v-list-item
                    ></v-list
                  >
                </v-list-item-title>
                <v-list-item-title
                  >Tailles:
                  <v-list v-for="(size, index) in product.Tailles" :key="index">
                    <v-list-item>
                      <v-list-item-title>{{
                        item.size
                      }}</v-list-item-title></v-list-item
                    ></v-list
                  ></v-list-item-title
                >
                <v-list-item-title
                  >Type de produit:
                  {{ product.idProductType }}</v-list-item-title
                >
                <v-list-item-title
                  >Garantit: {{ product.garantit }}</v-list-item-title
                >
                <v-list-item-title
                  >Numéro de serie: {{ product.serial }}</v-list-item-title
                >
                <v-list-item-title
                  >ajouté le: {{ product.createdAt }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list>
      </v-col>
      <v-col sm="12" md="6">
        <v-list no-action sub-group value="true" dense>
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nom: {{ boutique.name }}</v-list-item-title>
                <v-list-item-title v-if="boutique.enabled"
                  >En service</v-list-item-title
                >
                <v-list-item-title v-if="!boutique.enabled"
                  >Fermé</v-list-item-title
                >
                <v-list-item-title
                  >Proprietaire: {{ boutique.proprio }}</v-list-item-title
                >
                <v-list-item-title
                  >Addresse: {{ boutique.address }}</v-list-item-title
                >
                <v-list-item-title>
                  Numero: {{ boutique.number }}
                </v-list-item-title>
                <v-list-item-title
                  >ajouté le: {{ boutique.createdAt }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list>
      </v-col>
      <v-col sm="12">
        <v-carousel>
          <v-carousel-item
            v-for="(pic, i) in product.pics"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="text-center"
          >
            <v-avatar class="ma-3" size="300" tile>
              <v-img :src="pic.src"></v-img>
            </v-avatar>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
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
      product: [],
      boutique: [],
      modify: false
    };
  },
  mounted() {
    return productService
      .getOneProduct(this.$route.params.id)
      .then(async response => {
        this.product = response.data;
        productService.getOneBoutique(this.product.owner).then(res => {
          this.boutique = res.data;
        });
      });
  },
  methods: {}
};
</script>
