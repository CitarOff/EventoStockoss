<template>
  <v-app>
    <v-system-bar
      dark
      color="primary"
    >
      <router-link to='/'><v-icon>mdi-home</v-icon></router-link>
      <v-spacer></v-spacer>
      <v-icon>mdi-message</v-icon>
      <span>{{ nbEvent.count }} évènements aujourd'hui</span>
      <v-spacer></v-spacer>
      <span class="time">{{ date | moment }}</span>
    </v-system-bar>
    <v-main style="margin-top: 50px">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

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
  },
  filters: {
    moment: function (date) {
      return moment(date).format('H:mm');
    }
  }
}
</script>