<template>
<div class="text-center">
<form class="form-signup">
        <img class="mb-4" src="../assets/icon-above-font.png"/>
        <h1 class="h3 mb-3 font-weight-normal" v-if="mode == 'create'">Créer un compte</h1>
        <h1 class="h3 mb-3 font-weight-normal" v-else>Connectez-vous</h1> 
        <p v-if="mode == 'login'">Tu n'as pas encore de compte ? <span @click="switchToCreateAccount()">Clique ici.</span></p>
        <p v-else>Tu as déjà un compte ? <span @click="switchToLogin()">Clique ici.</span></p> 
          <label for="inputEmail"></label>
          <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Adresse email" required />
          <label for="inputUsername" v-if="mode == 'create'"></label>
          <input v-if="mode == 'create'" type="text" v-model="username" id="inputUsername" class="form-control" placeholder="Username" required />
          <label for="inputPassword"></label>
          <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required />
        <button v-if="mode == 'create'" @click="Signup" class="btn btn-lg btn-primary btn-block" type="submit">Envoyer</button>
        <button v-else @click="login" class="btn btn-lg btn-primary btn-block" type="submit">Envoyer</button>
        <p class="my-3 text-danger">{{ errorMsg }}</p>
</form>
</div>
</template>

<script>
import axios from "axios";
import router from '../router/index'

export default {
  name: "Signup",
  data() {
    return {
        username: "",
        email: "",
        password: "",
        mode: "login",
        errorMsg:""
    };
  },
  mounted: function () {
    if (localStorage.getItem("userId") > 0) {
      router.push({ name: 'ListMessages' });
    }
  },
  methods: {
    switchToCreateAccount () {
      this.mode = 'create';
    },
    switchToLogin() {
      this.mode = 'login';
    },
    Signup() {
          
      if 
        (this.email !== null || this.username !== null || this.password !== null) 
       {

      const self = this;
        axios
          .post("http://localhost:3000/api/signup", {
            username:this.username,
            email:this.email,
            password:this.password
          })
          .then(response => {
            console.log(response),
            self.login();
          })
          .catch(error => {
            this.errorMsg = error.response.data.error
          });
      }
    
    },
      login() {
        axios
          .post("http://localhost:3000/api/login", {
            email:this.email,
            password:this.password
          })
          .then(response => {
            localStorage.setItem('userId',response.data.userId)
            console.log(response)
            localStorage.setItem('token',response.data.token)
            router.push({ name: 'ListMessages' })
          })
          .catch(error => {
            this.errorMsg = error.response.data.error
          });
      } 
  }
};
</script>


<style scoped>
.text-center {
  text-align:center;
  display:flex;
  align-items:center;
  padding-bottom:40px;
}
.form-signup {
  width:100%;
  max-width: 330px;
  padding:15px;
  margin:auto;
}
img {
  width:132px;
  height:132px;
  vertical-align:middle;
  border-style:none;
}
.h3 {
  font-size:1.75rem;
  margin-top:-20px;
}
button {
  margin-top:22px;
  background-color: #7c3838;
}
button:hover {
  background-color: #3d0f0f;
}
span {
  cursor:pointer;
  text-decoration:underline;
  color:#7c3838;
}
span:hover {
  color:blue;
}
p {
  font-size: 15px;
}
</style>
