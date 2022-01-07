<template>
<button @click="onDeleteAccount" type="button" class="btn btn-primary" id="delete_user">Supprimer ce compte</button>
</template>

<script>
import axios from "axios";
import router from '../router/index'

export default {
    name: "deleteUser",
    data () {
        return {
            userId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        onDeleteAccount () {
            var r = confirm("Êtes-vous sûr de vouloir supprimer ce compte ?");
  if (r == true) {
     let id = localStorage.getItem("userId");
            axios.delete(`http://localhost:3000/api/user/${id}`,  {
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
      localStorage.clear()
      router.push({ name: 'Signup' })
        
  } 
           
        }
        }
}
</script>


<style>
#delete_user {
    border-radius: 25px;
    border: 1.5px solid;
}
</style>