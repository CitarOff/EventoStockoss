<template>
  <main>
      <v-container>
    <v-row justify="space-around">
      <v-card width="100%">
        <v-img
          height="100px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
        </v-img>
        <v-card-text style="display : flex; flex-direction: column; color: black; border-bottom: 2px solid #3f51b5;" class="font-weight-medium">
            <span>Nom : {{events.nom}} </span>
            <span>Date: {{events.date}}</span>
            <span>Organisateur: {{events.email}}</span>
            <br>
            <span>Description: </span>
            <span style="text-align: center">{{events.description}}</span>
        </v-card-text>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Commentaires
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="indigo"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon dark>
                        mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Nouveau commentaire</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                label="Auteur*"
                                required
                                v-model="newComment.auteur"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    solo
                                    label="Message*"
                                    counter
                                    maxlength="140"
                                    required
                                    v-model="newComment.message"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Annuler
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="addComment"
                    >
                        Enregistrer
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in commentaires"
              :key="message.id"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.auteur }}</strong> @{{ message.date }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  </main>
</template>


<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      eventBusy: true,
      dialog: false,
      commentaryBusy: true,
      events: {},
      commentaires : [],
      newComment: {
        auteur: '',
        message: ''
      }
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
        const {auteur, message} = this.newComment
        if(auteur && message) {
            const commentaire = {
                id_event: this.$route.params.id,
                auteur: auteur,
                message: message
            }

            axios
            .post(this.$hostname+'/commentaire/', commentaire)
            .then(() => {
                this.newComment = {auteur: '', message: ''}
                this.dialog = false
                this.$router.go(this.$router.currentRoute)
            })
        }
        this.dialog = false
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