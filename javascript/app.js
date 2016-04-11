/**
 * Copyright 2016 Red Hat
 * @author Lukas Vlcek lvlcek@redhat.com
 */

function App() {

    // Polyfill
    // https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    // Constants used cross whole application
    this.constant = {
        CHART_PREFIX: "chart-"
    };

    // Temporary workaround for chart click handler
    var chartClickHandler = function(d, test_id) {
        var fragment = [
            [ 'test_id=', encodeURI(String(test_id)) ].join(''),
            [ 'id=', encodeURI(String(d.id)) ].join(''),
            [ 'x=', String(d.x.getTime()) ].join('')
        ].join('&');
        // console.log(d);
        // console.log(fragment);
        window.location.href = [ 'detail.html', fragment ].join('#');
    };

    // Render the application using React
    ReactDOM.render(
        React.createElement(AppComponent, { chartClickHandler: chartClickHandler }),
        document.getElementById("dynamic")
    );
}

// Start the application
window.app = new App();