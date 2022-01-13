<template>
<div class="link_user">
<router-link to="/messages"><img src="../assets/home.png"/></router-link>
</div>
<div class="user_status">
<p>User</p>
</div>
<div class="user" v-if="myId!=='1'">
<deleteUser/>
</div>
<div class="user" v-if="myId!=='1'">
<updateUser/>
</div>
<div class="comment_box" v-for="comment in myComments" v-bind:key="comment">
<div v-if="comment.userId==myId">
<div class="UserName_et_date">
<p>{{comment.user.username}}</p>
<img src="../assets/delete.png" @click="deleteComments(comment.id)" class="btn_delete"/>
</div>
<div class="le_commentaire">
<p>{{comment.content}}</p>
</div>
<div class="div_btn_update">
<button @click="isShow =!isShow" type="button" class="btn btn-outline-primary" id="update_comment">Modifier commentaire</button>
</div>
<div v-show="isShow" class="show_btn" >
<button id="send_update" type="button" class="btn btn-primary" @click="updateMyComment(comment.id)" >Envoyer</button>
<textarea v-model="content" placeholder="Ecrivez votre nouveau commentaire" required></textarea>
</div>
</div>
</div>
</template>
<script>
import axios from "axios";
import deleteUser from "../components/deleteUser";
import updateUser from "../components/updateUser";

export default {
  name: "getUser",
  components: {
    deleteUser,
    updateUser,
  },
  data() {
      return {
          dataUser: [],
          myComments: [],
          myId: localStorage.getItem("userId"),
          isShow: false,
          show: false,
          content:""
      };
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#dee1e5');
    document.getElementById('app').setAttribute('style', 'padding-bottom:30px');
  },
  mounted () {
   {
    let id = localStorage.getItem("userId");
      axios
      .get(`http://localhost:3000/api/user/${id}`,  {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
          console.log(response);
          this.dataUser = response.data
          console.log(this.dataUser)
      })
      .catch((error) => {
          console.log(error)
      });
  }


{
  axios
    .get("http://localhost:3000/api/comments",  {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
        console.log(response);
        this.myComments = response.data
    })
    .catch((error) => {
        console.log(error)
    })
  }

},
  beforeUnmount () {
    document.querySelector('body').setAttribute('style', '');
    document.getElementById('app').setAttribute('style', '');
  },

methods: {
  deleteComments(e) {
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
    },
    updateMyComment (e) {
      axios.put(`http://localhost:3000/api/comments/${e}`, {
        content:this.content
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
    location.reload();
      }

   }   
};

</script>
<style scoped>
img {
  width:30px;
}
#send_update {
  margin: 10px 30% 10px 30%;
}
.btn-primary {
  border-radius: 10px;
  border: 1.5px solid;
  background-color: #7c3838;
}
.btn-primary:hover {
  background-color: #3d0f0f;
}
.btn_delete {
  width:25px;
}
textarea {
  margin: 0 3% 0 3%;
}
.comment_box {
  margin: 5px 20% 5px;
  background-color:white;
  box-shadow: #949aa0 1px 1px 1px;
}
.btn_show_all_comments {
  display:flex;
  justify-content: center;
  padding-top:15px;
}
.div_btn_update {
  display: flex;
  justify-content: center;
  padding-bottom: 14px;
}
.user {
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
}
#update_comment {
  border-radius: 10px;
  border: 2px solid;
  color: #7c3838;
}
#update_comment:hover {
  background-color: #3d0f0f;
  color: white;
}
.show_btn {
  display: flex;
  padding-top: 11px;
  flex-direction: column-reverse;
}
.link_user {
  display: flex;
  justify-content: center;
  padding: 20px 0 20px 0;
}
.UserName_et_date {
  display: flex;
  justify-content: space-between;
  margin-left: 3%;
  margin-right: 3%;
  padding-top: 10px;
}
.UserName_et_date p {
  font-weight: bold;
  font-size: 18px;
  color: #7c3838;
}
.le_commentaire {
  display: flex;
  justify-content: center;
  margin-left: 3%;
  margin-right: 2%;
  padding-bottom: 10px;
}
.le_commentaire p {
  overflow-wrap: break-word;
  word-break: break-all;
  color:#7c3838;
}
.user_status {
  display: flex;
  justify-content: center;
  font-size: 10px;
  font-style: italic;
  font-weight: bolder;
  color: green;
}

</style>