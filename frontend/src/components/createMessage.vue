<template>
<img id="addMessage" type="button" data-toggle="modal" data-target="#exampleModal" src="../assets/plus.svg"/>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nouveau message.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <div class="form-group">
            <label for="message-text" class="col-form-label">Message :</label>
            <textarea class="form-control" id="message-text" v-model="content" placeholder="Ecrivez un nouveau message" required></textarea>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Image (png,jpg,jpeg) :</label>
            <input class="form-control" name="imageUrl" id="recipient-name" v-on:change="selectFile" type="file" accept="image/png, image/jpeg, image/jpg" >
          </div>
          <div class="preview">
              <p>Aucun fichier choisi.</p>
           </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button  @click="createNewMessage" type="button" class="btn btn-primary" id="sendMsg">Envoyer</button>
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
            content:"",
            imageUrl:"",
            isShow: false,
        };
    },
    mounted () {
      const input = document.querySelector('input');
const preview = document.querySelector('.preview');

input.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'Aucun fichier choisi.';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.textContent = `${file.name}`;
        listItem.appendChild(para);
        document.getElementById("sendMsg").style.display = "inline-block";
      } else {
        para.textContent = `Type de fichier invalide. Veuillez choisir un fichier valide.`;
        listItem.appendChild(para).style.color = "red";
        document.getElementById("sendMsg").style.display = "none";
      }
      list.appendChild(listItem);
    }
  }
}
const fileTypes = [
  "image/jpeg",
  "image/pjpeg", 
  "image/png",
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}
    },
    methods: {
      selectFile(e) {
            this.imageUrl = e.target.files[0] || e.dataTransfer.files;

        },
        createNewMessage() {
          const formData = new FormData()
               formData.append("content", this.content)
                formData.append("imageUrl", this.imageUrl)
             axios.post("http://localhost:3000/api/messages/new",  formData,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
          location.reload()
      })
      .catch((error) => {
          alert(error.response.data.error)
          console.log(error)
      });
        }
    }
}
</script>

<style>
#addMessage {
    width: 40px;
    position:fixed;
	height:60px;
	bottom:40px;
	right:40px;
}
</style>