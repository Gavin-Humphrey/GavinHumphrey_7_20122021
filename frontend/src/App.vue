<template>
  <div id="nav">
  <nav class="navbar navbar-expand navbar">
  <div class="navbar-nav mr-auto">
        <li class="nav-item">
    <router-link to="/" class="nav-link">Home</router-link>
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
  background-color:#532222;
  border-bottom: 4px solid #d1515a;
}
.navbar-expand .navbar-nav .nav-link {
    color:white;
    font-size:1.2rem;
}
.nav-item p {
  margin:0;
}
</style>
