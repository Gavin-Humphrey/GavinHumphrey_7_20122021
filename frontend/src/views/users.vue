<template>
<div class="link_user">
<router-link to="/messages"><img src="../assets/home.png"/></router-link>
</div>
<div id="myUser" v-for="data in Users" v-bind:key="data.id">
<p>{{ data.username }}</p>
<div>
<button type="button" class="btn btn-primary" @click="deleteUserByAdmin(data.id)">Supprimer le compte</button>
</div>
</div>
</template>


<script>
import axios from "axios";

export default {
  name: "getUser",
  data() {
      return {
          Users: [],
          myId: localStorage.getItem("userId"),
          username:""
      };
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#dee1e5');
    document.getElementById('app').setAttribute('style', 'padding-bottom:30px');
  },
  mounted () {
   {
      axios
      .get('http://localhost:3000/api/users/',  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
          this.Users = response.data.user
          console.log(this.Users)
          this.username = response.data.user.username
      })
      .catch((error) => {
          console.log(error)
      });
  }

},
  beforeUnmount () {
    document.querySelector('body').setAttribute('style', '');
    document.getElementById('app').setAttribute('style', '');
  },
  methods: {
      deleteUserByAdmin(e) {
               var confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce compte ?");
  if (confirmation == true) {
            axios.delete(`http://localhost:3000/api/user/${e}`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
      })
      .catch((error) => {
          console.log(error)
      });
     location.reload();    
  } 
    },
  } 
};


</script>
<style scoped>
img {
  width:30px;
}
.link_user {
    display: flex;
    justify-content: center;
    padding: 20px 0 20px 0;
}
#myUser {
  margin: 15px 10% 15px;
  background-color:white;
  box-shadow: #949aa0 1px 1px 1px;
  display: flex;
  flex-direction: column;
}
#myUser div {
  display: flex;
  justify-content:center;
  padding-top: 15px;
  padding-bottom: 15px;
}
#myUser p {
    font-weight: bold;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 3%;
    color: #7c3838;
}
button {
  background-color: #7c3838;
  border: 1.5px solid;
  border-radius: 10px;
}
button:hover {
  background-color: #3d0f0f;
}
</style>