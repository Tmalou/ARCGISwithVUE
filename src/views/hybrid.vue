<template>
  <div>
    <div id="viewDiv"></div>
    <div id="map"></div>
  </div>
</template>

<script>
  import esriLoader from 'esri-loader';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.creatMap();
  },
  methods:{
    creatMap(){
      esriLoader.loadModules([
        'esri/views/MapView',
        "esri/Map",
        "esri/layers/CSVLayer",
        'esri/layers/TileLayer'
      ])
        .then(([
                 MapView,
                 Map,
                 CSVLayer,
                 TileLayer
               ]) => {
          let map = new Map({
            basemap: "hybrid"
          });
          // and we show that map in a container w/ id #viewDiv
          var view = new MapView({
            map: map,
            container: 'viewDiv',
            zoom: 15,
            // center: [-150.8014,62.2468]
            center: [108.38025,22.822371]
          });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://js.arcgis.com/4.9/esri/css/main.css');
  #viewDiv{
    padding: 0;
    margin: 0;
    height: 500px;
    width: 100%;
  }
  #map{
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
</style>
