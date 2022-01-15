<template>
<div>
<div class="lien_user">
<router-link to="users" v-if="myId==='1'"><img alt="users" src="../assets/users.png"/></router-link>
<router-link to="User" v-else><img alt="user" src="../assets/user.png"/></router-link>
</div>
<div class="create_message">
<createMessage/>
</div>
</div>

<div id="myMessage" v-for="data in allMessages" v-bind:key="data.id">
<router-link :to="`/messages/${data.id}`" id="myLink">
<div class="UserName_et_data">
<p>{{ data.user.username }}</p>
<p>{{ data.createdAt.slice(0,10).split('-').reverse().join('.') }}</p>
</div>
<div class="le_message">
<p>
{{ data.content }}
</p>
</div>
<div class="myImage" v-if="data.imageUrl!=0">
<img :src="data.imageUrl"/>
</div>
</router-link>
</div>
</template>


<script>
import axios from "axios";
import createMessage from "../components/createMessage";
export default {
  name: "getMessages",
  components: {
      createMessage
  },
  data() {
      return {
      id: "",
      content: "",
      imageUrl: "",
      allMessages: [],
      myId: localStorage.getItem("userId")
    };
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#dee1e5')
  },
  mounted () {
    axios
    .get("http://localhost:3000/api/messages",  {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
        this.allMessages = response.data;
        console.log(this.allMessages);
    })
    .catch((error) => {
        console.log(error)
    });
  },
  beforeUnmount () {
    document.querySelector('body').setAttribute('style', '')
  }
  
};
</script>

<style scoped>
.lien_user {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.lien_user img {
  width:60px;
  padding-bottom: 15px;
}
a {  
  text-decoration: none;
  text-decoration-line: none;
} 
a:hover {  
  text-decoration: none;
  text-decoration-line: none;
} 
#myMessage {
  margin: 25px 20% 25px;
  background-color:#f3f6f4;
  box-shadow: #949aa0 4px 4px 4px;
}
.UserName_et_data {
    display: flex;
    justify-content: space-between;
    margin-left: 3%;
    margin-right: 3%;
    padding-top: 10px;
}
.UserName_et_data p {
    font-weight: bold;
    font-size: 16px;
    color: #7c3838;
}

.le_message {
    display: flex;
    justify-content: center;
    margin-left: 3%;
    margin-right: 2%;
}
.le_message p {
    overflow-wrap: break-word;
    word-break: break-word;
    text-align:center;
    color:#7c3838;
}
.myImage {
    display: flex;
    justify-content: center;
    width: 90%;
}
.myImage img {
    object-fit: contain;
    margin-left: 10%;
    width: 80%;
    padding-bottom: 50px;
    max-width:250px;
}
</style>