<template>
<div class="lien_user">
<router-link to="/users" v-if="myId==='1'"><img src="../assets/users.svg"/></router-link>
<router-link to="/User" v-else><img src="../assets/user-svgrepo-com.svg"/></router-link>
<router-link to="/messages"><img src="../assets/home.svg"/></router-link>
</div>
<div class="user" v-if="myId==='1'">
<button type="button" class="btn btn-primary" @click="deleteUserByAdmin(message.userId)">Supprimer le compte</button>
</div>
<div v-if="message.userId==myId || myId==='1'" class="delete_if_exist">
<button @click="deleteMessages" type="button" class="btn btn-info" id="delete_message">Supprimer message</button>
</div>
<div id="myBoxMessage">
<div class="UserName_et_date">
<p>{{username}}</p>
<p>{{ createdAt }}</p>
</div>
<div class="le_message">
<p>{{message.content}}</p>
<div class="image" v-if="message.imageUrl!=0">
<img :src="message.imageUrl"/>
</div>
</div>
<div class="like_et_comments">
<div>
<img class="img_comment" src="../assets/comment.svg"/><p>{{this.comments.length}}</p>
</div>
<div>
<like/><p>{{likes}}</p>
</div>
</div>
</div>
<comments/>
<div v-for="comment in comments" v-bind:key="comment" class="my_comment">
<div class="UserName_et_date">
<p>{{comment.user.username}}</p>
</div>
<div class="le_commentaire">
<p>{{comment.content}}</p>
<div v-if="myId==='1'" class="delete_img" >
<img type="button" src="../assets/delete.svg" @click="deleteCommentByAdmin(comment.id)" />
</div>
</div>
</div>
</template>

<script>
import axios from "axios"
import comments from "../components/comments"
import like from "../components/like"
import router from '../router/index'


export default {
    name:"getMessageById",
    components: {
        comments,
        like,
    },
    data() {
        return {
            message: [],
            comments: [],
            myId: localStorage.getItem("userId"),
            content:"",
            isShow: false,
            likes: [],
            username:"",
            createdAt:""
        };
        
    },
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#dee1e5');
    document.getElementById('app').setAttribute('style', 'padding-bottom:30px');
  },
    mounted () {
      {
        axios.get(`http://localhost:3000/api/messages/${this.$route.params.id}/likes`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
       .then((response) => {
          console.log(response);
          this.likes = response.data.length;
          console.log(this.likes)
      })
      .catch((error) => {
          console.log(error)
      });
      }
        {
      axios
      .get(`http://localhost:3000/api/messages/${this.$route.params.id}`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
          this.message = response.data;
          console.log(this.message);
          this.username = this.message.user.username
          this.createdAt = response.data.createdAt.slice(0,10).split('-').reverse().join('.')
      })
      .catch((error) => {
          console.log(error)
      });
  }
    axios
      .get(`http://localhost:3000/api/messages/${this.$route.params.id}/comments`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
          this.comments = response.data
          console.log(this.comments.length)
      })
      .catch((error) => {
          console.log(error)
      })
    },
    beforeUnmounted () {
    document.querySelector('body').setAttribute('style', '');
    document.getElementById('app').setAttribute('style', '');
  },
    methods: {
      deleteMessages() {  
        var r = confirm("Êtes-vous sûr de vouloir supprimer ce message ?");
  if (r == true) {
      axios
      .delete(`http://localhost:3000/api/messages/${this.$route.params.id}`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response + "Message supprimé");     
      })
      .catch((error) => {
          console.log(error)
      });
      router.push({ name: 'ListMessages' })
    }
    },
    deleteUserByAdmin(e) {
               var confirmation = confirm("Êtes-vous sûr de vouloir supprimer le compte de l'auteur de ce message ?");
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
      router.push({ name: 'ListMessages' })
        
  } 
    },
    deleteCommentByAdmin(e) {
    var r = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");
  if (r == true) {
     axios
      .delete(`http://localhost:3000/api/comments/${e}`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response + "Commentaire supprimé");
          
      })
      .catch((error) => {
          console.log(error)
      });
      location.reload();
  }
    }
    }
}
</script>


<style scoped>
.user {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 15px;
  
}
.user button {
    border-radius: 25px;
    border: 1.5px solid;
}
.lien_user {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}
.lien_user img {
    width:30px;
    padding-bottom: 15px;
}
.delete_if_exist {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 15px;
    
}
#delete_message {
    border-radius: 25px;
    border: 1.5px solid;
}
#myBoxMessage {
  margin: 15px 10% 0px;
  background-color:white;
  box-shadow: #949aa0 1px 1px 1px;
}
.my_comment {
  margin: 0px 10% 0px;
  background-color:white;
  box-shadow: #949aa0 1px 1px 1px;
  border-bottom: 1px solid slategrey;
}
.UserName_et_date {
    display: flex;
    margin-left: 3%;
    padding-top: 10px;
    justify-content: space-between;
    margin-right: 3%;
}
.UserName_et_date p {
    font-weight: bold;
    font-size: 14px;
    color: dodgerblue;
}
.le_message, .le_commentaire {
    display: flex;
    justify-content: center;
    margin-left: 3%;
    margin-right: 2%;
    flex-direction: column;
}
.le_message p, .le_commentaire p {
    overflow-wrap: break-word;
    word-break: break-all;
    color:black;
    text-align: center;
    padding-bottom:14px;
}
.image img {
    width: 80%;
    margin-left: 10%;
    object-fit: contain;
    max-height: 230px
}
.img_comment {
  width:26px;
}
.like_et_comments {
  display: flex;
  justify-content: space-evenly;
  padding-bottom:12px;
  padding-top: 20px;
}
.like_et_comments div {
  display: flex;
  align-items: center;
}
.like_et_comments div p {
  margin: 0 0 0 9px;
}
.delete_img img {
    padding-bottom: 20px;
    width: 30px;
    float: right;
    margin-right: 3%;
}
</style>