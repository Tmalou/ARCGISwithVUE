<template>
  <div>
    <div id="gisMap"></div>
  </div>
</template>

<script>
  import esriLoader from 'esri-loader';
    export default {
        name: "popups",
        mounted(){
          if(esriLoader.isLoaded){
            this.creatMap()
          }
        },
        methods:{
          creatMap(){
            esriLoader.loadModules([
              "esri/Map",
              "esri/layers/FeatureLayer",
              "esri/views/MapView"]).then(
              ([
                Map,
                FeatureLayer,
                MapView
              ]) =>{
                var map = new Map({
                  basemap: "gray"
                });

                var view = new MapView({
                  container: "gisMap",
                  map: map,
                  center: [-73.950, 40.702],
                  zoom: 11
                });

                /*************************************************************
                 * The PopupTemplate content is the text that appears inside the
                 * popup. {fieldName} can be used to reference the value of an
                 * attribute of the selected feature. HTML elements can be used
                 * to provide structure and styles within the content. The
                 * fieldInfos property is an array of objects (each object representing
                 * a field) that is use to format number fields and customize field
                 * aliases in the popup and legend.
                 **************************************************************/

                var template = { // autocasts as new PopupTemplate()
                  title: "Marriage in NY, Zip Code: {ZIP}",
                  content: [{
                    // It is also possible to set the fieldInfos outside of the content
                    // directly in the popupTemplate. If no fieldInfos is specifically set
                    // in the content, it defaults to whatever may be set within the popupTemplate.
                    type: "fields",
                    fieldInfos: [{
                      fieldName: "MARRIEDRATE",
                      label: "Married %",
                      visible: true
                    }, {
                      fieldName: "MARRIED_CY",
                      label: "People Married",
                      visible: true,
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    }, {
                      fieldName: "NEVMARR_CY",
                      label: "People that Never Married",
                      visible: true,
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    }, {
                      fieldName: "DIVORCD_CY",
                      label: "People Divorced",
                      visible: true,
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    }]
                  }]
                };

                // Reference the popupTemplate instance in the
                // popupTemplate property of FeatureLayer
                var featureLayer = new FeatureLayer({
                  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0",
                  outFields: ["*"],
                  popupTemplate: template
                });
                map.add(featureLayer);
              }
            )
          }
        },
    }
</script>

<style scoped>

  @import url('https://js.arcgis.com/4.9/esri/css/main.css');

  #gisMap{
    padding: 0;
    margin: 0;
    height: 500px;
    width: 100%;
  }
</style>
