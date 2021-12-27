<template>
  <v-app>
    <v-system-bar
      dark
      color="primary"
    >
      <v-icon>mdi-home</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-message</v-icon>
      <span>{{ nbEvent.count }} évènements aujourd'hui</span>
      <v-spacer></v-spacer>
      <span>12:30</span>
    </v-system-bar>
    <v-main style="margin-top: 50px">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      nbEvent: 0
    }
  },
  mounted () {
    axios
      .get(this.$hostname+'/evenement/today')
      .then(response => {
        this.nbEvent = response.data
      })
  }
}
</script>