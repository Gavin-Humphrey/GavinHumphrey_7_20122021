<template>
<img type="button" class="img_like" alt="like1" src="../assets/like1.svg" @click="likeAMessage"/>
</template>
<script>
import axios from "axios";
export default {
    name: "LikeMessage",
    data () {
        return {
        }
    },
    methods: {
        likeAMessage() {
          axios.post(`http://localhost:3000/api/messages/${this.$route.params.id}/like`, {

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
.img_like {
  width: 26px;
}
</style>