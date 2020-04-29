# Floor Switcher Tool for Indoors - Apps (i.e. Respond)

## Contents

* [Floor Switcher Tool](#floor-switcher-tool)
    * [Build .cwmt File](#build-cwmt-file)
    * [Install](#install)
* [Development](#development)

## Floor Switcher Tool

Cityworks tool for Esri Indoors and [Esri JS API 3.x](https://developers.arcgis.com/javascript/3/).  Requires Esri Indoors compatible map.

### Build .cwmt File

1. Download the [Esri Indoors](https://github.com/Esri/indoors-floor-filter-js) utility as a zip file using the 'Clone or download' button.
2. Unzip the .zip file and copy the 'floorfilter' folder this folder.
3. Create a **floorSwitcherTool.zip** file containing:
    - **floorfilter** folder
    - **profiles** folder
    - **floorSwitcherTool.css**
    - **floorSwitcherTool.js**
    - **layout.pcd.json**
    - **map-tool-config.json**
4. Change **.zip** extension to **.cwmt**

## Install
1. Drag and Drop the **floorSwitcherTool.cwmt** file on to the **Map Tools** page in Designer -> GIS -> Map Tools in Cityworks Office to install.
2. Use **Plugin Map Tools** page in Designer -> GIS -> Plugin Map Tools in Cityworks Office to allow users to access the tool for each desired app, i.e. Respond.

## Development
1. Install dependencies using **npm -i**
2. Compile .tsx using **npm run build-tools**
