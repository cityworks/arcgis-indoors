define(["require", "exports", "tslib", "dojo/dom-construct", "esri/core/Handles", "esri/widgets/Widget", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, tslib_1, domConstruct, Handles, Widget, watchUtils, decorators_1, widget_1) {
    "use strict";
    var CSS = {
        widgetIcon: 'esri-icon-checkbox-unchecked'
    };
    var FloorSwitcherTool = (function (_super) {
        tslib_1.__extends(FloorSwitcherTool, _super);
        function FloorSwitcherTool() {
            var _this = _super.call(this) || this;
            _this._handles = new Handles();
            _this.iconClass = CSS.widgetIcon;
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
                this._floorFilter = this._createFloorFilter(this.floorFilterDiv);
            }
            else if (this.floorFilterDiv && this._floorFilter) {
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
        tslib_1.__decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "basePath", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "iconClass", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FloorSwitcherTool.prototype, "mapHelper", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FloorSwitcherTool.prototype, "layout", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FloorSwitcherTool.prototype, "floorFilterDiv", void 0);
        FloorSwitcherTool = tslib_1.__decorate([
            decorators_1.subclass('esri.widgets.FloorSwitcherTool')
        ], FloorSwitcherTool);
        return FloorSwitcherTool;
    }(Widget));
    return FloorSwitcherTool;
});
