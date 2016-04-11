var AppComponent = React.createClass({
    displayName: "AppComponent",
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var request = fetch('config/conf.json');
        request
            .then(function(response) {
                return response.json();
            })
            .then((function(data) {
                this.setState(data);
            }).bind(this))
            .catch((function(ex) {
                this.setState({ "error": ex });
            }).bind());
    },
    render: function() {
        var elements = [];
        // console.log('state', this.state);
        if (this.state && this.state.error) {
            elements.push(
                [this.state.error.name, this.state.error.toString()].join('')
            )
        } else {
            if (this.state && this.state.tests_metadata && this.state.tests_metadata.length > 0) {
                for (var i in this.state.tests_metadata) {
                    var test = this.state.tests_metadata[i];
                    elements.push(
                        React.createElement(TestComponent, test)
                    );
                }
            } else {
                elements.push(
                    React.createElement("p",{}, "There are no tests configured for display.")
                );
            }
        }
        return React.createElement("div", null, elements);
    },
    componentDidUpdate: function() {
        for (var i in this.state.tests_metadata) {
            var test = this.state.tests_metadata[i];
            if (test.chart_enabled) {
                var element_id = "chart-" + test.code;
                var element = document.getElementById(element_id);
                var chart = _chart.generateChart(element, "", this.props.chartClickHandler);
            }
        }
    }
});