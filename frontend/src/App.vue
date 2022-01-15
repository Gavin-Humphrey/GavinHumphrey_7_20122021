<template>
  <div id="nav">
  <nav class="navbar navbar-expand navbar">
  <div class="navbar-nav mr-auto">
        <li class="nav-item">
    <router-link to="/" class="nav-link"><img alt="icon" src="./assets/icon.png"/></router-link>
    </li>
        <li class="nav-item">
    <p class="nav-link" @click="logout" type="button">Logout</p>
    </li>
    </div>
    </nav>
  </div>
  <router-view/>
</template>

<script>
import router from './router/index'

export default {
  methods: {
    logout() {
      var r = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
      if (r == true) {
      localStorage.clear();
      router.push({ name: 'Signup' })
    }
    }
  }
};
</script>


<style>
nav {
  background-color:#f3f6f4;
  height: 100px;
  box-shadow: #949aa0 4px 4px 4px;
}
.navbar-expand .navbar-nav .nav-link {
    color:#7c3838;
    font-size:1.2rem;
}
.nav-item p {
  margin:0;
}
img {
  width: 50px;
  margin-top: -10px;
}
</style>
