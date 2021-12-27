<template>
  <div id="app">
    <div id="topBar">
      <router-link to='/' style="color: white"><b-icon icon="house-fill" style="width: 45px; height: 45px;"></b-icon></router-link>
      <h1>Application Evento</h1>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#topBar {
  height: 50px;
  background-color: #2c3e50;
  color: white;
  margin-bottom: 30px;
  display: flex;
}
</style>
