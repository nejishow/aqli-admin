<template>
  <div>
    <v-alert
      :value="alert"
      color="pink"
      dark
      border="top"
      icon="mdi-home"
      transition="scale-transition"
    >
      <v-subheader>{{ alertMessage }}</v-subheader>
    </v-alert>
    <v-row>
      <v-col>
        <categoryHeader></categoryHeader>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <h4>Nouvelle Categorie</h4>

        <v-form ref="formCat" v-model="valid" lazy-validation>
          <v-text-field
            :rules="nameRules"
            v-model="cat.name"
            label="Categorie"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="newCat"
          >
            Sauvegarder
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column align-center">
      <v-col sm="12" md="6">
        <h4>Nouvelle sous-catégorie</h4>
        <v-form ref="formSub" v-model="valids" lazy-validation>
          <v-select
            v-model="sub.idCategory"
            item-text="name"
            item-value="_id"
            :items="allCategory"
            outlined
            label="Categories"
          ></v-select>
          <v-text-field
            :rules="nameRules"
            v-model="sub.name"
            label="Sous-catégorie"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valids"
            color="success"
            class="mr-4"
            @click="newSub"
          >
            Sauvegarder
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row class=" d-flex">
      <v-col sm="12" md="6">
        <FirebaseUpload
          :isProductType="true"
          :productType="prod"
        ></FirebaseUpload>
        <p>
          <v-img :src="srcPic ? srcPic : ''"></v-img>
        </p>
      </v-col>
      <v-col sm="12" md="6">
        <h4>Nouveau type de produit</h4>
        <v-form ref="formProd" v-model="validp" lazy-validation>
          <v-select
            v-model="prod.idSubCategory"
            item-text="name"
            item-value="_id"
            :items="allSub"
            outlined
            label="Sous-catégories"
          ></v-select>
          <v-text-field
            :rules="nameRules"
            v-model="prod.name"
            label="Type de produit"
            required
          ></v-text-field>

          <v-btn
            :disabled="!validp"
            color="success"
            class="mr-4"
            @click="newProd"
          >
            Sauvegarder
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import categoryService from "../../services/categoryService.js";
import categoryHeader from "../../components/categoryHeader.vue";
import FirebaseUpload from "../../components/FirebaseUpload.vue";

export default {
  components: {
    categoryHeader,
    FirebaseUpload
  },
  data() {
    return {
      cat: {
        name: "",
        enabled: true
      },
      sub: {
        name: "",
        idCategory: "",
        enabled: true
      },
      prod: {
        name: "",
        idSubCategory: "",
        src: "",
        enabled: true
      },
      allCategory: [],
      allSub: [],
      alert: false,
      alertMessage: "",
      valid: true,
      valids: true,
      validp: true,
      nameRules: [v => !!v || "Le nom complet est obligatoire"],
      cntPoint: 1
    };
  },
  mounted() {
    this.getCategories();
    this.getSub();
  },
  computed: {
    srcPic() {
      return this.$store.state.src;
    }
  },
  methods: {
    addPoint() {
      this.points.push({ point: this.point });
      this.point = "";
    },
    getCategories() {
      categoryService.getAllCategory().then(async response => {
        this.allCategory = response.data;
        await this.allCategory.sort((a, b) => {
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
    getSub() {
      categoryService.getAllSubcategory().then(async response => {
        this.allSub = response.data;
        await this.allSub.sort((a, b) => {
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
    newCat() {
      this.$refs.formCat.validate();
      categoryService.addOneCategory(this.cat).then(res => {
        this.alertMessage = res.data.name + " a été ajouté";
        this.alert = true;
        setTimeout(() => {
          this.$router.go();

          this.alert = false;
        }, 3000);
      });
    },
    newSub() {
      this.$refs.formSub.validate();
      if (this.$refs.formSub.validate()) {
        categoryService.addOneSub(this.sub).then(res => {
          this.alertMessage = res.data.name + " a été ajouté";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          }, 3000);
        });
      }
    },
    newProd() {
      this.$refs.formProd.validate();
      if (this.$refs.formProd.validate()) {
        this.prod.src = this.$store.state.src;
        console.log(this.prod.src);
        categoryService.addOneProd(this.prod).then(res => {
          this.alertMessage = res.data.name + " a été ajouté";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
            this.$router.go();
          }, 3000);
        });
      }
    }
  }
};
</script>
