var TestSources = React.createClass({
    displayName: "TestSources",
    getInitialState: function() { return {}; },
    render: function () {
        return React.createElement("table", null,
            React.createElement(TableHeader, null),
            React.createElement(TableBody, this.props)
        )
    }
});

var TestComponent = React.createClass({
    displayName: "TestComponent",
    getInitialState: function() { return {}; },
    render: function() {
        var elements = [
            React.createElement("h2", { id: this.props.code }, this.props.display_name),
            React.createElement("p", null, this.props.description)
        ];
        if (this.props.chart_enabled) {
            elements.push(
                React.createElement("div", { id: app.constant.CHART_PREFIX + this.props.code, className: "chart" })
            )
        }
        elements.push(
            React.createElement("small", null, React.createElement(TestSources, this.props ))
        );
        return React.createElement("div", null, elements);
    }
});