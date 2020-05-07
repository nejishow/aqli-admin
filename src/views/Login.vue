<template>
  <v-row class="justify-content-center">
    <v-col sm="12" md="5" class="card mt-5 p-5">
      <h4>Connection</h4>
      <div class="form-group">
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre email</label
          >
          <input
            id="email"
            v-model="loginForm.email"
            type="text"
            class="form-control"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre mot de passe</label
          >
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            class="form-control"
            placeholder="mot de passe"
          />
        </div>
        <div class="form-group d-flex">
          <button class="btn btn-group btn-info rounded-pill" @click="submit">
            Connexion
          </button>
        </div>
      </div>
      <span class="text-danger bg-white rounded-pill text-center">{{
        error
      }}</span>
    </v-col>
  </v-row>
</template>
<script>
export default {
  // middleware: ["isNotAuth"],
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("login", {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then(() => this.$router.go(-1))
        .catch(error => {
          this.error = error.response.data;
        });
    }
  }
};
</script>
