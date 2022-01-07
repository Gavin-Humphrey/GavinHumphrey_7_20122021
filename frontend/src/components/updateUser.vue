<template>
<button id="update_user" type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">Modifier le nom d'utilisateur</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier utilisateur.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <div class="form-group">
            <label for="message-text" class="col-form-label">Modification:</label>
            <textarea class="form-control" id="message-text" v-model="username" placeholder="Modifier votre nom d'utilisateur"></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button  @click="updateUsername" type="button" class="btn btn-primary">Envoyer</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "updateUser",
    data () {
        return {
            username:"",
            isShow: false,
        }
    },
    methods: {
        updateUsername () {
            let id = localStorage.getItem("userId");
            axios.put(`http://localhost:3000/api/user/${id}`, {
                username:this.username
            } , {
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
        location.reload()
        }
        
    }
    
}
</script>

<style>
#update_user {
    border-radius: 25px;
    border: 1.5px solid;
}
</style>