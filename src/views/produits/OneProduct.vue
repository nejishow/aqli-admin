<template>
  <div>
    <v-row>
      <v-col sm="12">
        <productHeader></productHeader>
      </v-col>
    </v-row>
    <v-row v-show="!modify" class="border-danger">
      <v-col sm="12"
        ><div class="d-flex justify-space-between">
          <h3>Description du produit</h3>
          <v-btn color="purple" class="text-light" @click="modify = !modify"
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
    <v-row v-show="modify">
      <v-col sm="12"
        ><div class="d-flex justify-space-between">
          <h3>Modification du produit</h3>
          <div class="d-flex justify-content-between">
            <v-btn color="error" class="text-light" @click="cancel"
              >Annuler</v-btn
            >
            <v-btn
              :loading="loading"
              color="success"
              class="text-light"
              @click="modifyProduct"
              >Sauvegarder</v-btn
            >
          </div>
        </div>
        <span class="card border-danger">{{ errorMessage }}</span></v-col
      >
      <v-col sm="12" md="6">
        <v-list no-action sub-group value="true" dense>
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <label class="font-weight-bold">Nom:</label>
                <input v-model="product.name" class="border-bottom" />
                <div class="border-bottom">
                  Disponible:
                  <v-checkbox
                    v-model="product.enabled"
                    :color="product.enabled ? 'success' : 'error'"
                  ></v-checkbox>
                </div>
                <label class="font-weight-bold">Prix:</label>
                <input v-model="product.price" class="border-bottom" />
                <label class="font-weight-bold">Mot clés:</label>
                <input v-model="product.keywords" class="border-bottom" />
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
                <label class="font-weight-bold">Type de produit:</label>
                <v-select
                  item-text="name"
                  item-value="_id"
                  :items="allProductType"
                  v-model="product.idProductType"
                ></v-select>
                <label class="font-weight-bold">Garantit:</label>
                <input v-model="product.garantit" class="border-bottom" />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list>
      </v-col>
      <v-col sm="12" md="6">
        <v-card>
          <v-select
            item-text="name"
            item-value="_id"
            :items="allBoutique"
            v-model="product.owner"
          ></v-select>
        </v-card>
      </v-col>
      <v-row>
        <v-col sm="12" md="6">
          <FirebaseUpload
            :isProductM="true"
            :product="product"
            :productType="ptValue"
            @newImg="newImg"
          ></FirebaseUpload>
        </v-col>
        <v-col sm="12" md="6">
          <v-list dense>
            <v-card>
              <v-list-item v-for="(pic, index) in product.pics" :key="index">
                <v-list-item-content>
                  <v-img width="200" height="200" :src="pic.src"></v-img>
                </v-list-item-content>
                <v-list-item-content>
                  <v-btn @click="supPic(pic)">sup</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-list>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
import productService from "../../services/productService.js";
import categoryService from "../../services/categoryService.js";
import productHeader from "../../components/productHeader.vue";
import FirebaseUpload from "../../components/FirebaseUpload.vue";

export default {
  components: {
    productHeader,
    FirebaseUpload
  },
  data() {
    return {
      product: [],
      boutique: [],
      allBoutique: [],
      allProductType: [],
      modify: false,
      loading: false,
      errorMessage: ""
    };
  },
  mounted() {
    return productService
      .getOneProduct(this.$route.params.id)
      .then(response => {
        this.product = response.data;
        productService.getOneBoutique(this.product.owner).then(res => {
          this.boutique = res.data;
        });
        productService.getAllBoutique().then(res => {
          this.allBoutique = res.data;
        });
        categoryService.getAllProductType().then(res => {
          this.allProductType = res.data;
        });
      });
  },
  computed: {
    ptValue() {
      const pt = this.allProductType.filter(type => {
        return type._id == this.product.idProductType;
      });
      return pt;
    }
  },
  methods: {
    newImg(url) {
      this.product.pics.push({ src: url });
    },
    supPic(pic) {
      this.product.pics = this.product.pics.filter(picture => {
        return picture !== pic;
      });
    },
    cancel() {
      this.modify = false;
      productService.getOneProduct(this.$route.params.id).then(response => {
        this.product = response.data;
        productService.getOneBoutique(this.product.owner).then(res => {
          this.boutique = res.data;
        });
      });
    },
    modifyProduct() {
      this.loading = true;
      productService
        .modifyProduct(this.product)
        .then(async () => {
          this.loading = false;
          await this.cancel();
        })
        .catch(() => {
          this.errorMessage =
            "Une erreur est survenue , actualise et recommence";
        });
    }
  }
};
</script>
