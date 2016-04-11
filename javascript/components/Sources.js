var TableRow = React.createClass({
    render: function() {
        var content = this.props.href ?
            React.createElement("a", { href: this.props.href }, this.props.value) :
            this.props.value;
        return React.createElement("tr", null,
            React.createElement("td", null, this.props.desc),
            React.createElement("td", null, content)
        )
    }
});

var TableBody = React.createClass({
    render: function() {
        var rows = [];
        rows.push(
            React.createElement(TableRow, {
                desc: "Aggregated data",
                value: this.props.code + ".json",
                href: "aggregations/" + this.props.code + ".json" // TODO: get location from config
            })
        );
        if (this.props.source_url) {
            rows.push(
                React.createElement(TableRow, {
                    desc: "Test script",
                    value: this.props.source_url,
                    href: this.props.source_url
                })
            );
        }
        return React.createElement("tbody", null, rows)
    }
});

var TableHeader = React.createClass({
    render: function() {
        return React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", { colSpan: 2 }, "Sources")
            )
        )
    }
});