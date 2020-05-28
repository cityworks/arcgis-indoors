# indoors-floor-filter-js

This is an ArcGIS API for JavaScript widget that lets you filter ArcGIS Indoors data to view a selected facility (building) and level (floor). Learn about ArcGIS Indoors and the ArcGIS Indoors Information Model [here](https://pro.arcgis.com/en/pro-app/help/data/indoors/get-started-with-arcgis-indoors.htm).

![demo video](./indoors-floorfilter-js-doc-video-demo02.gif "demo video")

## Features
* Automatically detects and reads ArcGIS Indoors map layers
* Provides intuitive way to pick and view data for a particular level
* Select a facility (building) via map click or dropdown list
* Configurable style and behaviors

## Requirements
* An existing ArcGIS API for JavaScript 3.x or 4.x mapping application.
* A map containing layers that conform to the [ArcGIS Indoors Information Model feature classes](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm#ESRI_SECTION1_E6F8CE6530DE4D0B94CA289D3A4CFA52).
    * Sample ArcGIS Indoors data is available for download from [My Esri](https://my.esri.com/). For more information, see the ArcGIS Pro Help: [Download and install ArcGIS Indoors](https://pro.arcgis.com/en/pro-app/help/data/indoors/download-and-install-arcgis-indoors.htm)
    * At minimum, the widget requires a layer that conforms to the Indoors model's [Levels feature class](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm#ESRI_SECTION2_31525AA777E54CDD884C7F2B31F7D51B). If your Levels layer is named something else (such as "Floors"), use `layerIdentifiers` to map the layer name.  
    * Certain widget functions require a layer that conforms to the Indoors model's [Facilities feature class](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm#ESRI_SECTION2_B7500B49156641338AADC25F6113607D). Such functions include highlighting when hovering over a facility polygon, or clicking on a facility polygon to activate it in the widget. If your Facilities layer is named something else (such as "Buildings"), use `layerIdentifiers` to map the layer name.

## Instructions
1. Download and unzip the .zip file.
1. Copy/paste the `floorfilter` folder into your own project folder.
1. In your app:
    1. Below the last existing `<link>` tag that references an Esri `.css`, add a `<link>` to reference the `floorfilter/style/main.css` file.
    1. Above the existing `<script>` tag that references the ArcGIS API for JavaScript, add a `<script>` to reference the `floorfilter` folder.
1. Add and style a `<div>` in which to display the widget.
1. Add the `floorfilter/FloorFilter` module and alias to your `require()`.
1. Construct a new instance of FloorFilter.

For additional details, see the Constructor and Code Examples sections, below.

## Constructor
```
new FloorFilter(properties);
```
The `properties` object must include a `map` (if using version 3.x of the JavaScript API) or `view` (if using 4.x); other properties are optional.

| Name                   | Type                     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|------------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activeFacilityId`     | `String`                 | *(optional)* Activates the specified facility when the widget starts. Value must be found in the Facility layer's `facility_id` field. *default=null*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `activeLevelId`        | `String`                 | *(optional)* Activates the specified level when the widget starts. Has no effect if `activeFacilityId` is `null`. Value must be found in the Level layer's `level_id` field. *default=null*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `autoZoomOnStart`      | `Boolean`                | *(optional)* Zoom the map to the extent of the activated facility when the widget starts. Has no effect if `activeFacilityId` is `null`. *default=true*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `facilitiesUrl`        | `String`                 | *(optional)* REST service endpoint URL of a Facilities 2D layer. This property is required when using a webscene. If `null`, widget looks for the layer in the map. *default=null*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `highlightColor`       | `String`                 | *(optional)* The outline color used to highlight a facility on mouseover. Value can be a hex string ("#C0C0C0") or a named string ("blue"). *default="#005e95"*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `highlightFacility2D`  | `Boolean`                | *(optional)* Outline the active facility using the highlightColor when viewing a 2D map. *default=true*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `layerIdentifiers`     | `Object`                 | *(optional)* Maps [ArcGIS Indoors Information Model](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm) feature classes to layers in your map. *default=* ``` {   "sites": ["Sites"],   "facilities": ["Facilities", "Facilities Textured"],   "levels": ["Levels"],   "units": ["Units"],   "details": ["Details"], } ```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `layerMappings`        | `Object`                 | *(optional)* Maps [ArcGIS Indoors Information Model](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm) feature class attributes to attributes in layers that do not conform to the Indoors Model. If `null`, widget looks for attributes that conform to the Indoors Model. <br/>*default=null* <br/> <br/>Object structure:<br/>`"layerMappings": [`<br/>&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"layerTitle": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"mappings": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"facilityIdField": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"facilityNameField": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"levelIdField": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"levelNameField": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"levelNumberField": "",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"verticalOrderField": ""`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;`}`<br/>`]`<br/><br/>By default, the Floor Filter widget only affects the visibility of features in layers that are part of the Indoors Model. To affect the visibility of features in non-Indoors layers, use `layerMappings` to tell the Floor Filter widget which fields specify a feature's facility and level.<br/><br/>To make the widget filter a layer's features based on the selected facility, map a field to either `facilityIdField` or `facilityNameField`. To make the widget filter a layer's features based on the selected level, map a field to one of the following: `levelIdField`, `levelNameField`, `levelNumberField`, or `verticalOrderField`.<br/><br/>For example, if you have an "Assets" layer with a "Building" field indicating the name of the facility in which each asset is located, and a "Floor" field indicating the level number on which each asset is located, construct the `layerMappings` object like this: <br/><br/>`"layerMappings": [`<br/>&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"layerTitle": "Assets",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"mappings": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"facilityNameField": "Building",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"levelNumberField": "Floor"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br/>&nbsp;&nbsp;&nbsp;`}`<br/>`]` |
| `levelsUrl`            | `String`                 | *(optional)* REST service endpoint URL of a Levels layer. This property is required when using a webscene. If `null`, widget looks for the layer in the map. *default=null*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `map`                  | `Map`                    | The ArcGIS API for JavaScript 3.x `Map` with which the widget is associated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `showAllFloorPlans2D`  | `Boolean`                | *(optional)* Show floor plans for all facilities when viewing a 2D map. The active facility will show the selected level; other facilities will show the level where VERTICAL_ORDER is 0. *default=true*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `toggleFacilityShells` | `Boolean`                | *(optional)* Turn off/on a facility's footprint when the facility is activated/deactivated. *default=true*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `view`                 | `MapView` or `SceneView` | The ArcGIS API for JavaScript 4.x `MapView` or `SceneView` with which the widget is associated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `watchFacilityClick`   | `Boolean`                | *(optional)* Activate a facility when the user clicks on its footprint. *default=true*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `watchFacilityHover`   | `Boolean`                | *(optional)* Highlight a facility when the user hovers over its footprint. When widget is associated with a 2D map or view, *default=false*; when associated with a 3D scene, *default=true*.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
## Functions
| Name          | Return Type | Summary                                                                                                                                                                                                                                                                            |
|---------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onChange`  | `Object`    | Listen for changes to the widget's active facility and/or active level.<br/><br/>`floorFilter.onChange = function(props) {`<br/>&nbsp;&nbsp;`console.log(props);`<br/>`};`<br/><br/>Example output:<br/>`{ facilityId: "CAMPUS.MAIN.ELLIS", levelId: "CAMPUS.MAIN.ELLIS.2" }`                    |
| `setFacility()` | `undefined` | Set the widget's active facility and/or level. A facility key/value pair is required; a level key/value pair is optional. Supported keywords:<br/><ul><li>Facility: `facilityId`, `facilityName`</li><li>Level: `levelId`, `levelName`, `levelNumber`, `verticalOrder`</li></ul>`floorFilter.setFacility({`<br/>&nbsp;&nbsp;`facilityName: "Ellis Hall",`<br/>&nbsp;&nbsp;`levelNumber: 2`<br/>`});` |

## Code Examples

#### JavaScript 3.x API
```javascript
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
    <title>ArcGIS Indoors - Floorfilter - JSAPI3</title>
    <link rel="stylesheet" href="https://js.arcgis.com/3.31/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="https://js.arcgis.com/3.31/esri/css/esri.css">
    <link rel="stylesheet" href="./floorfilter/style/main.css">
    <style>
        html,
        body,
        #map {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        #floorfilter {
            position: absolute;
            top: 20px;
            left: 100px;
        }
    </style>
    
    <script>
        var dojoConfig = {
            async: true,
            packages: [
                {
                    name: "floorfilter",
                    location: location.pathname.replace(/\/[^/]*$/, "") + "/floorfilter"
                }
            ]
        };
    </script>
    <script src="https://js.arcgis.com/3.31/"></script>
    
    <script>
        var map;
        require([
            "esri/map",
            "esri/arcgis/utils",
            "floorfilter/FloorFilter",
            "dojo/domReady!"
        ], function (
            Map,
            arcgisUtils,
            FloorFilter) {

                // Your ArcGIS Indoors web map 
                var portalUrl = ""; // the web map's hosting portal URL; example: https://myPortal/portal 
                var webmapId = ""; // the web map's item id

                arcgisUtils.arcgisUrl = portalUrl + "/sharing/rest/content/items/";
                arcgisUtils.createMap(webmapId, "map").then(function (response) {
                    var map = response.map;
                    window.map = map;

                    var floorFilter = new FloorFilter({
                        map: map
                    }, "floorfilter");
                });
            });
    </script>
</head>
<body class="claro esri">
    <div id="map"></div>
    <div id="floorfilter"></div>
</body>
</html>
```

#### JavaScript 4.x API - WebMap (2D)
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <title>ArcGIS Indoors - Floorfilter - JSAPI4 - WebMap</title>

    <link rel="stylesheet" href="https://js.arcgis.com/4.14/esri/themes/light/main.css"/>
    <link rel="stylesheet" href="./floorfilter/style/main.css"/>
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
      #floorfilter {
        position: absolute;
        top: 20px;
        left: 100px;
      }
    </style>

    <script>
      var dojoConfig = {
          async: true,
          packages: [
              {
                  name: "floorfilter",
                  location: location.pathname.replace(/\/[^/]*$/, "") + "/floorfilter"
              }
          ]
      };
    </script>
    <script src="https://js.arcgis.com/4.14/"></script>

    <script>
      require([
        "esri/views/MapView",
        "esri/WebMap",
        "esri/config",
        "floorfilter/FloorFilter"
        ], function(MapView, WebMap, esriConfig, FloorFilter) {
          
          // Your ArcGIS Indoors web map 
          var portalUrl = ""; // the web map's hosting portal URL; example: https://myPortal/portal 
          var webmapId = ""; // the web map's item id

          esriConfig.portalUrl = portalUrl;
          var webmap = new WebMap({
            portalItem: {
              // autocasts as new PortalItem()
              id: webmapId 
            }
          });

          var view = new MapView({
            map: webmap,
            container: "viewDiv"
          });

          var floorFilter = new FloorFilter({
            view: view
          }, "floorfilter");
        }
      );
    </script>
  </head>
  <body>
    <div id="viewDiv"></div>
    <div id="floorfilter"></div>
  </body>
</html>
```

#### JavaScript 4.x API - WebScene (3D)
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <title>ArcGIS Indoors - Floorfilter - JSAPI4 - WebScene</title>

    <link rel="stylesheet" href="https://js.arcgis.com/4.14/esri/themes/light/main.css"/>
    <link rel="stylesheet" href="./floorfilter/style/main.css"/>
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
      #floorfilter {
        position: absolute;
        top: 20px;
        left: 100px;
      }
    </style>

    <script>
      var dojoConfig = {
          async: true,
          packages: [
              {
                  name: "floorfilter",
                  location: location.pathname.replace(/\/[^/]*$/, "") + "/floorfilter"
              }
          ]
      };
    </script>
    <script src="https://js.arcgis.com/4.14/"></script>

    <script>
      require([
        "esri/views/SceneView", 
        "esri/WebScene",
        "esri/config",
        "esri/portal/Portal",
        "floorfilter/FloorFilter"], 
        function(SceneView, WebScene, esriConfig, Portal, FloorFilter) {
          
          // Your ArcGIS Indoors web scene
          var portalUrl = ""; // the web scene's hosting portal URL; example: https://myPortal/portal
          var websceneId = ""; // the web scene's item id
          
          // When using a webscene, must point facilitiesUrl and levelsUrl to 2D layers
          var facilitiesUrl = ""; // REST service endpoint URL of the 2D Facilities layer
          var levelsUrl = ""; // REST service endpoint URL of the 2D Levels layer
            
          esriConfig.portalUrl = portalUrl;
          var portal = new Portal({
            url: portalUrl
          });
          portal.load().then(function() {
            var map = new WebScene({
              portalItem: {id: websceneId}
            });
            
            map.load().then(function(){
              var view = new SceneView({
                container: "viewDiv",
                map: map
              });
                
              var floorFilter = new FloorFilter({
                view: view,
                facilitiesUrl: facilitiesUrl,
                levelsUrl: levelsUrl
              },"floorfilter");
            });
          });
        });
    </script>
  </head>
  <body>
    <div id="viewDiv"></div>
    <div id="floorfilter"></div>
  </body>
</html>
```

## Resources

* [Get Started with ArcGIS Indoors](https://pro.arcgis.com/en/pro-app/help/data/indoors/get-started-with-arcgis-indoors.htm)
* [ArcGIS Indoors Information Model](https://pro.arcgis.com/en/pro-app/help/data/indoors/arcgis-indoors-information-model.htm#ESRI_SECTION1_E6F8CE6530DE4D0B94CA289D3A4CFA52)
* [ArcGIS API for JavaScript 4.x - API Reference](https://developers.arcgis.com/javascript/latest/)
* [ArcGIS API for JavaScript 3.x - API Reference](https://developers.arcgis.com/javascript/3/jsapi/)

## Issues
Find a bug or want to request a new feature? Please let us know by submitting an issue.

## Contributing
Anyone and everyone is welcome to contribute.

## Licensing
Copyright 2020 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE.txt](https://github.com/Esri/indoors-floor-filter-js/blob/master/LICENSE.txt) file.
