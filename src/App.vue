<template>
  <div id="app">
    <div>
      <button class="btn" @click="pushRout('hybrid')">hybrid</button>
      <button class="btn" @click="pushRout('popups')">popups</button>
      <button class="btn" @click="pushRout('draw')">draw</button>
      <button class="btn" @click="pushRout('scenelayer')">sceneLayer</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    pushRout(item){
      if(item === 'hybrid'){
        this.$router.push({name:'hybrid'})
      }else{
        this.$router.push({name:item})
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .btn{
    width: 140px;
    height: 50px;
    border: 0px;
    background-color: #a0c5e4;
    color: #ffffff;
    font-size: 20px;
    margin: 10px 10px;
    outline: none;
  }
  .btn:focus{
    background-color: #48a9e4;
  }
</style>
