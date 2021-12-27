<template>
  <main>
    <v-card>
    <v-card-title>
      Évènements
      <v-spacer></v-spacer>
      <v-btn
        class="mx-3"
        fab
        dark
        x-small
        color="indigo"
        @click="search = ''"
      >
        <v-icon dark>
          mdi-cancel
        </v-icon>
      </v-btn>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="events"
      :search="search"
      :loading="isBusy"
      loading-text="Loading... Please wait"
    >
    <template v-slot:top>
      

      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="indigo"
        @click="refresh()"
      >
        <v-icon dark>
          mdi-cached
        </v-icon>
      </v-btn>

      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="indigo"
        @click="add()"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="open(item.id)"
      >
        mdi-format-list-bulleted-square
      </v-icon>
    </template>
    
    </v-data-table>
  </v-card>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      headers: [
        {
          value: 'nom',
          text: 'Nom',
          filterable: true
        },
        {
          value: 'date',
          text: 'Date',
          filterable: true
        },
        {
          value: 'email',
          text: 'Organisateur',
          filterable: true
        },
        { 
          value: 'action', 
          text: 'Ouvrir',
          filterable: false
        }
      ],
      events: [],
      isBusy: true,
      search: ""
    }
  },
  mounted () {
    axios
      .get(this.$hostname+'/evenement/')
      .then(response => {
        this.events = response.data
        this.isBusy = false;
      })
  }, methods: {
    add() {

    },
    open(id) {
      this.$router.push({path: '/evenement/'+id})
    },
    refresh() {
      this.isBusy = true
      this.events = []
      axios
      .get(this.$hostname+'/evenement/')
      .then(response => {
        this.events = response.data
        this.isBusy = false;
      })
    }
  }
}
</script>

<style scoped>
main {
  margin: 0 auto;
}

.inputGroup {
  margin-left: 15px;
}
</style>