var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/Handles", "esri/widgets/Widget", "dojo/dom-construct", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, Handles, Widget, domConstruct, watchUtils, decorators_1, widget_1) {
    "use strict";
    var FloorSwitcherTool = /** @class */ (function (_super) {
        __extends(FloorSwitcherTool, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function FloorSwitcherTool() {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._handles = new Handles();
            _this._onMapHelperChange = _this._onMapHelperChange.bind(_this);
            return _this;
        }
        FloorSwitcherTool.prototype.postInitialize = function () {
            var _this = this;
            this._initFloorSwitcherFiles();
            this.own(watchUtils.init(this, 'mapHelper', function () { return _this._onMapHelperChange(); }));
            this.own(watchUtils.init(this, 'floorFilterDiv', function () { return _this._onFloorFilterDivChange(); }));
        };
        FloorSwitcherTool.prototype.render = function () {
            var retVal = (widget_1.tsx("div", { class: 'floor-switcher-tool' },
                widget_1.tsx("div", { afterCreate: widget_1.storeNode, bind: this, "data-node-ref": "floorFilterDiv" })));
            return retVal;
        };
        FloorSwitcherTool.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
        };
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
        FloorSwitcherTool.prototype._getCustomString = function (key) {
            return this.layout && this.layout.strings && this.layout.strings[key] ? this.layout.strings[key] : key;
        };
        FloorSwitcherTool.prototype._onMapHelperChange = function () {
            if (this.mapHelper) {
                this.view = this.mapHelper.map.getMapView();
            }
        };
        FloorSwitcherTool.prototype._onFloorFilterDivChange = function () {
            if (this.floorFilterDiv && !this._floorFilter) {
                // create floorFilter
                this._floorFilter = this._createFloorFilter(this.floorFilterDiv);
            }
            else if (this.floorFilterDiv && this._floorFilter) {
                // update rendering node
                domConstruct.place(this._floorFilter['domNode'], this.floorFilterDiv);
            }
        };
        FloorSwitcherTool.prototype._initFloorSwitcherFiles = function () {
            var _this = this;
            this.mapHelper.layout.addCss(this.basePath + "floorfilter/style/main.css");
            this.mapHelper.layout.addCss(this.basePath + "floorSwitcherTool.css");
            var filterPackage = {
                location: this.basePath + "floorfilter",
                name: 'floorfilter'
            };
            require({
                packages: [filterPackage]
            }, ['floorfilter/FloorFilter'], function (FloorFilter) {
                _this._newFilterFn = function (arg, div) { return new FloorFilter(arg, div); };
            });
        };
        FloorSwitcherTool.prototype._createFloorFilter = function (div) {
            if (!this._newFilterFn) {
                return null;
            }
            try {
                var mapView = this.mapHelper.map.getMapView();
                return this._newFilterFn({ view: mapView }, div);
            }
            catch (e) {
                this.mapHelper.log.showUserMessage(e, true);
            }
            return null;
        };
        __decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "basePath", void 0);
        __decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FloorSwitcherTool.prototype, "mapHelper", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FloorSwitcherTool.prototype, "layout", void 0);
        __decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "floorFilterDiv", void 0);
        FloorSwitcherTool = __decorate([
            decorators_1.subclass('esri.widgets.FloorSwitcherTool')
        ], FloorSwitcherTool);
        return FloorSwitcherTool;
    }(decorators_1.declared(Widget)));
    return FloorSwitcherTool;
});
