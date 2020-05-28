define(["dojo/dom-construct", "custom/floorfilter/FloorFilter"], function (domConstruct, FloorFilter) {
    return function (proxy, cfg) {
        var defMessages, region, initialized = false, displayPanel, filter;

        function initUI() {
            var dfd = proxy.utility.deferred();

            var config = { label: cfg.title, title: cfg.title };

            var container = domConstruct.create("div", { "class": "floor-switcher" });
            config.content = container;
			initialized = true;
            dfd.resolve(config);
            return dfd;
        }

        function selectChild() {
            proxy.layout.toggleRegion({ region: region, expanded: true });
            proxy.layout.selectChild(displayPanel);
        }

        //This function will be run when the plugin is loaded into the map
        function init() {
            var dfd = proxy.utility.deferred();
            proxy.layout.addCssFile("custom", "floorfilter/style/main.css");
            //get custom xml file
            proxy.layout.getDefinition("FloorSwitcherTool").then(function (definition) {
                defMessages = definition.Messages;
                region = defMessages.LayoutRegion.Value;
                dfd.resolve();
            }, function (failed) {
                proxy.log.reportMessage(failed, 'error');
                dfd.reject(failed);
            });
            return dfd;
        }

        //This function will be run every time the user opens the plugin
        function show() {
            if (!initialized) {
                initUI().then(function (config) {
                    if (region == "leading") {
                        displayPanel = proxy.layout.createLeadingPanel(config);
                    } else {
                        displayPanel = proxy.layout.createTrailingPanel(config);
                    }

                    var map = proxy.map.get();
                    filter = new FloorFilter({
                        map: map
                    }, config.content);
                    selectChild();                   
                });
            } else {
                selectChild();
            }
        }

        //required by plugin framework
        this.init = init;
        this.show = show;
    };
});