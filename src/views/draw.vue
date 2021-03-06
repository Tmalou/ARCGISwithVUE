<template>
  <div id="viewDiv">
    <div id="topbar">
      <button class="action-button esri-icon-blank-map-pin" id="pointButton" type="button" title="Draw point"></button>
      <button class="action-button esri-icon-polyline" id="polylineButton" type="button" title="Draw polyline"></button>
      <button class="action-button esri-icon-polygon" id="polygonButton" type="button" title="Draw polygon"></button>
      <button class="action-button esri-icon-checkbox-unchecked" id="rectangleButton" type="button" title="Draw rectangle"></button>
      <button class="action-button esri-icon-radio-unchecked" id="circleButton" type="button" title="Draw circle"></button>
      <button class="action-button esri-icon-trash" id="resetBtn" type="button" title="Clear graphics"></button>
    </div>
  </div>
</template>

<script>
  import esriLoader from 'esri-loader';
    export default {
        name: "draw",
        mounted(){
          this.creatMap();
        },

        methods: {
          creatMap() {
            esriLoader.loadModules([
              "esri/views/MapView",
              "esri/Map",
              "esri/widgets/Sketch/SketchViewModel",
              "esri/Graphic",
              "esri/layers/GraphicsLayer"
            ]).then(
              ([MapView, Map, SketchViewModel, Graphic, GraphicsLayer]) => {
                let editGraphic;

                // GraphicsLayer to hold graphics created via sketch view model
                const graphicsLayer = new GraphicsLayer({
                  id: "tempGraphics"
                });

                const map = new Map({
                  basemap: "satellite",
                  layers: [graphicsLayer]
                });

                const view = new MapView({
                  container: "viewDiv",
                  map: map,
                  zoom: 8,
                  center: [108.38025,22.822371]
                });

                const pointSymbol = {
                  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                  style: "square",
                  color: "#7be22f",
                  size: "16px",
                  outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 3
                  }
                };

                const polylineSymbol = {
                  type: "simple-line", // autocasts as new SimpleLineSymbol()
                  color: "#e2b675",
                  width: "4",
                  style: "dash"
                };

                const polygonSymbol = {
                  type: "simple-fill", // autocasts as new SimpleFillSymbol()
                  color: "rgba(138,43,226, 0.8)",
                  style: "solid",
                  outline: {
                    color: "white",
                    width: 1
                  }
                };

                view.when(function () {
                  // create a new sketch view model
                  const sketchViewModel = new SketchViewModel({
                    view,
                    layer: graphicsLayer,
                    pointSymbol,
                    polylineSymbol,
                    polygonSymbol
                  });

                  setUpClickHandler();

                  // Listen to create-complete event to add a newly created graphic to view
                  sketchViewModel.on("create-complete", addGraphic);

                  // Listen the sketchViewModel's update-complete and update-cancel events
                  sketchViewModel.on("update-complete", updateGraphic);
                  sketchViewModel.on("update-cancel", updateGraphic);

                  // called when sketchViewModel's create-complete event is fired.
                  function addGraphic(event) {
                    // Create a new graphic and set its geometry to
                    // `create-complete` event geometry.
                    console.log(event)
                    const graphic = new Graphic({
                      geometry: event.geometry,
                      symbol: sketchViewModel.graphic.symbol
                    });
                    graphicsLayer.add(graphic);
                  }

                  // Runs when sketchViewModel's update-complete or update-cancel
                  // events are fired.
                  function updateGraphic(event) {
                    // Create a new graphic and set its geometry event.geometry
                    var graphic = new Graphic({
                      geometry: event.geometry,
                      symbol: editGraphic.symbol
                    });
                    graphicsLayer.add(graphic);

                    // set the editGraphic to null update is complete or cancelled.
                    editGraphic = null;
                  }

                  // set up logic to handle geometry update and reflect the update on "graphicsLayer"
                  function setUpClickHandler() {
                    view.on("click", function (event) {
                      view.hitTest(event).then(function (response) {
                        var results = response.results;
                        if (results.length > 0) {
                          for (var i = 0; i < results.length; i++) {
                            // Check if we're already editing a graphic
                            if (!editGraphic && results[i].graphic.layer.id === "tempGraphics") {
                              // Save a reference to the graphic we intend to update
                              editGraphic = results[i].graphic;

                              // Remove the graphic from the GraphicsLayer
                              // Sketch will handle displaying the graphic while being updated
                              graphicsLayer.remove(editGraphic);
                              sketchViewModel.update(editGraphic);
                              break;
                            }
                          }
                        }
                      });
                    });
                  }

                  // activate the sketch to create a point
                  var drawPointButton = document.getElementById("pointButton");
                  drawPointButton.onclick = function () {
                    // set the sketch to create a point geometry
                    sketchViewModel.create("point");
                    setActiveButton(this);
                  };

                  // activate the sketch to create a polyline
                  var drawLineButton = document.getElementById("polylineButton");
                  drawLineButton.onclick = function () {
                    // set the sketch to create a polyline geometry
                    sketchViewModel.create("polyline");
                    setActiveButton(this);
                  };

                  // activate the sketch to create a polygon
                  var drawPolygonButton = document.getElementById("polygonButton");
                  drawPolygonButton.onclick = function () {
                    // set the sketch to create a polygon geometry
                    sketchViewModel.create("polygon");
                    setActiveButton(this);
                  };

                  // activate the sketch to create a rectangle
                  var drawRectangleButton = document.getElementById(
                    "rectangleButton");
                  drawRectangleButton.onclick = function () {
                    // set the sketch to create a polygon geometry
                    sketchViewModel.create("rectangle");
                    setActiveButton(this);
                  };

                  // activate the sketch to create a circle
                  var drawCircleButton = document.getElementById("circleButton");
                  drawCircleButton.onclick = function () {
                    // set the sketch to create a polygon geometry
                    sketchViewModel.create("circle");
                    setActiveButton(this);
                  };

                  // reset button
                  document.getElementById("resetBtn").onclick = function () {
                    sketchViewModel.reset();
                    graphicsLayer.removeAll();
                    setActiveButton();
                  };

                  function setActiveButton(selectedButton) {
                    // focus the view to activate keyboard shortcuts for sketching
                    view.focus();
                    var elements = document.getElementsByClassName("active");
                    for (var i = 0; i < elements.length; i++) {
                      elements[i].classList.remove("active");
                    }
                    if (selectedButton) {
                      selectedButton.classList.add("active");
                    }
                  }
                });
              });
          }
        }
    }
</script>

<style scoped>
  @import url('https://js.arcgis.com/4.9/esri/css/main.css');

  #viewDiv{
    padding: 0;
    margin: 0;
    height: 500px;
    width: 100%;
  }
  #topbar {
    background: #ffffff;
    position: absolute;
    top: 150px;
    right: 15px;
    padding: 10px;
  }

  .action-button {
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #D3D3D3;
    color: #6e6e6e;
    height: 32px;
    width: 32px;
    text-align: center;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .action-button:hover,
  .action-button:focus {
    background: #0079c1;
    color: #e4e4e4;
  }

  .active {
    background: #0079c1;
    color: #e4e4e4;
  }
</style>
