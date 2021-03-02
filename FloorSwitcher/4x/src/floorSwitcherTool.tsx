import domConstruct = require('dojo/dom-construct');

import Handles = require('esri/core/Handles');
import MapView = require('esri/views/MapView');
import SceneView = require('esri/views/SceneView');
import Widget = require('esri/widgets/Widget');
import watchUtils = require('esri/core/watchUtils');

import { property, subclass } from 'esri/core/accessorSupport/decorators';
import { renderable, tsx, storeNode } from 'esri/widgets/support/widget';

import { ICwMapHelper } from '@cw-map/map/dist/cw-map-helper';

declare var require: any;

const CSS = {
    widgetIcon: 'esri-icon-checkbox-unchecked'
};

@subclass('esri.widgets.FloorSwitcherTool')
class FloorSwitcherTool extends Widget {
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
        this._onMapHelperChange = this._onMapHelperChange.bind(this);
    }

    postInitialize(): void {
        this._initFloorSwitcherFiles();

        this.own(watchUtils.init(this, 'mapHelper', () => this._onMapHelperChange()));

        // watch for changes to the div containing the floor filter tool
        this.own(watchUtils.init(this, 'floorFilterDiv', () => this._onFloorFilterDivChange()));
    }

    render() {
        // use 'storeNode' to get reference to the created div after render has executed
        const retVal = (
            <div class='floor-switcher-tool'>
                <div afterCreate={storeNode} bind={this} data-node-ref="floorFilterDiv" />
            </div>
        );

        return retVal;
    }

    destroy(): void {
        this._handles.destroy();
        this._handles = null;
    }

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------

    private _handles: Handles = new Handles();

    /**
     * function to create a FloorFilter widget
     */
    private _newFilterFn: (arg: any, div: HTMLDivElement | string | undefined) => __esri.Widget;

    /**
     * Floor Filter widget
     */
    private _floorFilter: __esri.Widget;

    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * the base path for the map tool
     */
    @property()
    basePath: string;

    /**
     * the icon that Esri will display when the widget is collapsed in the expand panel
     */
    @property()
    iconClass = CSS.widgetIcon;

    @property()
    view: MapView | SceneView;

    @property()
    @renderable()
    mapHelper: ICwMapHelper;

    @property()
    @renderable()
    layout: { strings: { [key: string]: string } };


    //--------------------------------------------------------------------------
    //
    //  html controls
    //
    //--------------------------------------------------------------------------
    /**
     * HTML div element for displaying the tool
     */
    @property()
    floorFilterDiv: HTMLDivElement;

    //--------------------------------------------------------------------------
    //
    //  renderable properties - will update ui when changed
    //
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    private _getCustomString(key: string): string {
        return this.layout && this.layout.strings && this.layout.strings[key] ? this.layout.strings[key] : key;
    }

    private _onMapHelperChange() {
        if (this.mapHelper) {
            this.view = this.mapHelper.map.getMapView();
        }
    }

    private _onFloorFilterDivChange() {
        if (this.floorFilterDiv && !this._floorFilter) {
            // create floorFilter
            this._floorFilter = this._createFloorFilter(this.floorFilterDiv);
        } else if (this.floorFilterDiv && this._floorFilter) {
            // update rendering node
            domConstruct.place(this._floorFilter['domNode'], this.floorFilterDiv);
        }
    }

    /**
     * load 'floorfilter' files
     */
    private _initFloorSwitcherFiles() {
        this.mapHelper.layout.addCss(`${this.basePath}floorfilter/style/main.css`);
        this.mapHelper.layout.addCss(`${this.basePath}floorSwitcherTool.css`);

        const filterPackage = {
            location: `${this.basePath}floorfilter`,
            name: 'floorfilter'
        };

        require({
            packages: [filterPackage]
        }, ['floorfilter/FloorFilter'], (FloorFilter) => {
            this._newFilterFn = (arg: any, div: HTMLDivElement) => new FloorFilter(arg, div);
        });
    }

    /**
     * Create new floorfilter widget
     * @param div containing element
     */
    private _createFloorFilter(div: HTMLDivElement): __esri.Widget {
        if (!this._newFilterFn) {
            return null;
        }

        try {
            const mapView = this.mapHelper.map.getMapView();
            return this._newFilterFn({ view: mapView }, div);
        }
        catch (e) {
            this.mapHelper.log.showUserMessage(e, true);
        }
        return null;
    }
}

export = FloorSwitcherTool;
