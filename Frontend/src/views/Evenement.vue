<template>
  <main>
    <b-card title="Évènement" sub-title="" class="evenements">
      <b-card-text style="text-align: left">
        <b-row class="my-1">
          <span><b>Nom:</b> {{ events.nom }} </span>
          <span><b>Email:</b> {{ events.email }} </span>
          <span><b>Date:</b> {{ events.date }} </span>
          <br><br>
          <span style="text-align: center"><b>Description:</b></span>
          <span>{{ events.description }}</span>
        </b-row >
      </b-card-text>
    </b-card>
    <b-card sub-title="" class="commentaires">
        <b-card-title>Commentaires <b-icon icon="plus-circle" aria-hidden="true" @click="addComment()" class="mr-2"></b-icon></b-card-title>
        <div class="comment" v-for="comment in commentaires" :key="comment.id">
            <span>{{ comment.auteur }}</span>
            <span>{{ comment.message }}</span>
            <span>{{ comment.date }}</span>
        </div>
    </b-card>
  </main>
</template>


<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      eventBusy: true,
      commentaryBusy: true,
      events: {},
      commentaires : []
    }
  },
  mounted () {
    axios
      .get(this.$hostname+'/evenement/' + this.$route.params.id)
      .then(response => {
        this.events = response.data[0]
        this.eventBusy = false;
      })

    axios
      .get(this.$hostname+'/commentaire/' + this.$route.params.id)
      .then(response => {
        this.commentaires = response.data
        this.commentaryBusy = false;
      })
  }, methods: {
      addComment() {
          alert("noice")
      }
  }
}
</script>

<style scoped>
main {
    width: 90%; 
    margin: 0 auto; 
}

.my-1 {
    flex-direction: column !important;
}

.my-1 span {
  font-size: 1.3rem;
}

.evenements {
    width: 49%; 
    float: left; 
    height: 600px;
}

.commentaires {
    margin: 0 0 2% 2%;
    width: 49%; 
    float: left; 
    height: 600px; 
    overflow-y: scroll;
}

.comment {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
}

.comment:nth-child(even) {
    background-color: #2c3e50;
    color: white;
}

.comment:nth-child(odd) {
    background-color: rgb(73, 104, 134);
    color: white;
}

.comment span:first-of-type {
    text-align: left;
    font-size: 0.7em;
}

.comment span:last-of-type{
    text-align: right;
    font-size: 0.7em;
}

</style>