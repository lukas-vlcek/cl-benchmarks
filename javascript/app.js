/**
 * Copyright 2016 Red Hat
 * @author Lukas Vlcek lvlcek@redhat.com
 */

// Constants used cross whole application
window.AppConstant = {
    CHART_PREFIX: "chart-",
    VIEW_MASTER: "master",
    VIEW_DETAIL: "detail"
};

function App() {

    // Polyfill
    // https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    // Temporary workaround for chart click handler
    var chartClickHandler = function(d, test_id) {
        page([ '/detail', test_id, d.id, d.x.getTime() ].join('/'));
    };

    // Render the application using React
    var reactInstance =ReactDOM.render(
        React.createElement(AppComponent, {
            chartClickHandler : chartClickHandler
        }),
        document.getElementById("dynamic")
    );

    // Whenever router is updated we set new state to top level React component
    window.routeChanged = function(ctx, next) {
        // console.log('routeChanged: ctx', ctx);
        reactInstance.setState(ctx);
    };

    // Configure and start router
    page.base( (app_baseurl.length > 0 ? '/' + app_baseurl : '') + '/#');
    page('/:view/:one?/:two?/:three?/:four?/:five?', routeChanged);
    page('/*', routeChanged);
    page();
}

// Start the application
window.app = new App();