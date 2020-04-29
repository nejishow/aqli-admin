<template>
  <div>
    <div>
      <p>{{ message }}:</p>
      <input type="file" @change="previewImage" accept="image/*" />
    </div>
    <div v-if="imageData != null">
      <img class="preview" :src="picture" />
      <br />
      <button @click="onUpload">Charger</button>
    </div>
  </div>
</template>

<script>
const firebase = require("../firebaseConfig.js");
import categoryService from "../services/categoryService.js";

export default {
  name: "Upload",
  props: [
    "isBanner",
    "isProduct",
    "isProductType",
    "product",
    "productType",
    "category"
  ],
  data() {
    return {
      imageData: null,
      picture: [],
      uploadValue: 0
    };
  },
  computed: {
    message() {
      if (this.isProduct) {
        return "Enregistrer les photos d'un produits";
      }
      if (this.isProductType) {
        return "Enregistrer la photo d'un type de produit";
      }
      return "test";
    }
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      //this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      if (this.isProduct) {
        categoryService
          .getOneSubCategory(this.productType[0].idSubCategory)
          .then(async response => {
            await categoryService
              .getOnecategory(response.data.idCategory)
              .then(async res => {
                const storageRef = firebase
                  .storage()
                  .ref(
                    res.data.name +
                      "/" +
                      response.data.name +
                      "/" +
                      this.productType[0].name +
                      "/" +
                      this.product.name +
                      "/" +
                      this.imageData.name
                  )
                  .put(this.imageData);
                storageRef.on(
                  "state_changed",
                  snapshot => {
                    this.uploadValue =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  },
                  error => {
                    console.log(error.message);
                  },
                  () => {
                    storageRef.snapshot.ref.getDownloadURL().then(url => {
                      this.picture.push(url);
                      this.$store.dispatch("setPicture", this.picture);
                    });
                  }
                );
              });
          });
      }
      if (this.isProductType) {
        categoryService
          .getOneSubCategory(this.productType.idSubCategory)
          .then(async response => {
            console.log(response.data.name);

            await categoryService
              .getOnecategory(response.data.idCategory)
              .then(async res => {
                console.log(res.data.name);

                const storageRef = firebase
                  .storage()
                  .ref(
                    res.data.name +
                      "/" +
                      response.data.name +
                      "/" +
                      this.productType.name +
                      "/" +
                      this.imageData.name
                  )
                  .put(this.imageData);
                storageRef.on(
                  "state_changed",
                  snapshot => {
                    this.uploadValue =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  },
                  error => {
                    console.log(error.message);
                  },
                  () => {
                    storageRef.snapshot.ref.getDownloadURL().then(url => {
                      console.log(url);
                      this.$store.dispatch("setSrc", url);
                    });
                  }
                );
              });
          });
      }
    }
  }
};
</script>

<style scoped>
img.preview {
  width: 200px;
}
</style>
