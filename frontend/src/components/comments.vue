<template>
<div class="create_comment">
<button id="addComment" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">Ajouter un commentaire</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nouveau commentaire.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <div class="form-group">
            <label for="message-text" class="col-form-label">Votre commentaire:</label>
            <textarea class="form-control" id="message-text" v-model="content" placeholder="Ecrivez un nouveau commentaire" required ></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button  @click="createNewComment" type="button" class="btn btn-primary">Envoyer</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>


<script>
import axios from "axios"
export default {
    name: "newMessage",
    data() {
        return {
            content:""
        };
    },
    methods: {
        createNewComment() {
             axios.post(`http://localhost:3000/api/messages/${this.$route.params.id}/comments/new`, {
          content: this.content
        },  {
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
.create_comment {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid slategrey;
    margin: 0 20%;
    background-color: #f3f6f4;
    box-shadow: #949aa0 4px 4px 4px;
}
#addComment {
    border-radius: 25px;
    border: 1.5px solid;
    background-color: #7c3838;
    color: white;
}
</style>