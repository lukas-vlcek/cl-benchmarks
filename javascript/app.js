/**
 * Copyright 2016 Red Hat
 * @author Lukas Vlcek lvlcek@redhat.com
 */

function App() {

    var chartClickHandler = function(d, element) {
        var fragment = [
            [ 'id=', encodeURI(String(d.id)) ].join(''),
            [ 'x=', String(d.x.getTime()) ].join('')
        ].join('&');
        // console.log(d);
        // console.log(fragment);
        window.location.href = [ 'detail.html', fragment ].join('#');
    };

    ReactDOM.render(
        React.createElement(AppComponent, { chartClickHandler: chartClickHandler }),
        document.getElementById("dynamic")
    );
}

app = new App();