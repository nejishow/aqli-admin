<template>
  <div>
    <v-row>
      <v-alert
        :value="alert"
        close-text="Fermer"
        color="pink"
        dark
        border="top"
        icon="mdi-home"
        transition="scale-transition"
        style="position: fixed; z-index: 999"
      >
        <h3>{{ alertMessage }}</h3>
      </v-alert>
      <v-col sm="12">
        <productHeader></productHeader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col sm="12">Ajouter un produit</v-col>

            <v-col sm="12" md="5">
              <v-text-field
                v-model="product.name"
                :rules="nameRules"
                label="Nom du produit"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="3">
              <v-select
                v-model="product.owner"
                item-text="name"
                item-value="_id"
                :items="boutiques"
                outlined
                label="Boutiques"
              ></v-select>
            </v-col>
            <v-col sm="12" md="2">
              <v-text-field
                v-model="product.price"
                :rules="numberRules"
                label="Prix"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="4">
              <v-select
                v-model="product.idProductType"
                item-text="name"
                item-value="_id"
                :items="productType"
                outlined
                label="Type de produits"
              ></v-select>
            </v-col>
            <v-col sm="12" md="6">
              <v-text-field
                v-model="product.keywords"
                :rules="[v => !!v || 'Champ obligatoire']"
                label="Mots clés"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="6" class="d-flex">
              <div class="d-flex">
                <v-text-field
                  v-model="color"
                  label="Couleurs"
                  required
                ></v-text-field>
                <v-btn @click="addColor" small color="pink" class="text-light"
                  >ajouter</v-btn
                >
              </div>
              <v-list dense>
                <v-card>
                  <v-list-item
                    v-for="(color, index) in product.Couleurs"
                    :key="index"
                  >
                    <v-list-item-subtitle>{{
                      color.color
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
            <v-col sm="12" md="6" class="d-flex">
              <div class="d-flex">
                <v-text-field
                  v-model="size"
                  label="Tailles"
                  required
                ></v-text-field>
                <v-btn @click="addSize" small color="blue" class="text-light"
                  >ajouter</v-btn
                >
              </div>
              <v-list dense>
                <v-card>
                  <v-list-item
                    v-for="(size, index) in product.Tailles"
                    :key="index"
                  >
                    <v-list-item-subtitle>{{
                      color.size
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
            <v-col sm="12" md="3">
              <v-text-field
                v-model="product.garantit"
                :rules="numberRules"
                label="Garanti"
                required
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="3"> </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6">
              <div class="d-flex">
                <v-text-field
                  v-model="description"
                  label="description"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="content"
                  label="contenu"
                  required
                ></v-text-field>
                <v-btn
                  @click="addDescription"
                  small
                  color="pink"
                  class="text-light"
                  >ajouter</v-btn
                >
              </div>
            </v-col>
            <v-col sm="12" md="6">
              <v-list dense>
                <v-card>
                  <v-list-item
                    v-for="(des, index) in product.description"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-subtitle>{{ des }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-btn @click="supdes(des)">sup</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
            <v-col sm="12" md="6" class="card d-flex justify-space-between">
              <v-avatar v-for="(pic, index) in pictures" :key="index" tile>
                <v-img :src="pic"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row> </v-row>
        </v-form>
        <v-col
          sm="12"
          md="6"
          v-show="product.idProductType && product.name !== ''"
        >
          <FirebaseUpload
            :isProduct="true"
            :product="product"
            :productType="PTvalue"
          ></FirebaseUpload>
        </v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-col sm="6" md="2">
            <v-btn color="yellow" @click="addProduct">Ajouter</v-btn>
          </v-col>
        </v-form>
      </v-col>
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
      alertMessage: "",
      alert: false,
      valid: true,
      color: "",
      size: "",
      description: "",
      content: "",
      boutiques: [],
      productType: [],
      category: [],
      product: {
        name: "",
        price: 0,
        owner: "",
        pics: [],
        Couleurs: [],
        Tailles: [],
        description: [],
        idProductType: null,
        keywords: "",
        garantit: 0
      },
      nameRules: [
        v => !!v || "Champ obligatoire",
        v => !v.includes(",") || "Pas de virgules"
      ],
      numberRules: [
        v => !!v || "Le numero est nescessaire pour les livraisons",
        v => /^[0-9]+$/.test(v) || "chiffres"
      ]
    };
  },
  mounted() {
    productService.getAllBoutique().then(async response => {
      this.boutiques = response.data;
      await this.boutiques.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    });
    categoryService.getAllProductType().then(async response => {
      this.productType = response.data;
      await this.productType.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    });
  },
  computed: {
    PTvalue() {
      const pt = this.productType.filter(type => {
        return type._id == this.product.idProductType;
      });
      return pt;
    },
    pictures() {
      return this.$store.state.picture;
    }
  },
  methods: {
    addColor() {
      this.product.Couleurs.push({ color: this.color });
      this.color = "";
    },
    addSize() {
      this.product.Tailles.push({ size: this.size });
      this.size = "";
    },
    addDescription() {
      this.product.description.push({ [this.description]: this.content });
      this.description = "";
      this.content = "";
    },
    supdes(des) {
      this.product.description = this.product.description.filter(descr => {
        return descr !== des;
      });
    },
    addProduct() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.product.pics = [];
        this.pictures.forEach(element => {
          this.product.pics.push({ src: element });
        });
        productService
          .postProduct(this.product)
          .then(() => {
            this.alertMessage = "Produit ajouté!";
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
              this.$router.go("/products");
            }, 3000);
          })
          .catch(() => {
            this.alertMessage = "Produit non ajouté!";
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 3000);
          });
      }
    }
  }
};
</script>
