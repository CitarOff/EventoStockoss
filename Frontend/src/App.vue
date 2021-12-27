<template>
  <v-app>
    <v-system-bar
      dark
      color="primary"
    >
      <v-icon>mdi-home</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-message</v-icon>
      <span>10 évènements aujourd'hui</span>
      <v-spacer></v-spacer>
      <span>12:30</span>
    </v-system-bar>
    <v-main style="margin-top: 50px">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>