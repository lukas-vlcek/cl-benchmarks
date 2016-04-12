var DetailComponent = React.createClass({
    displayName: "DetailComponent",
    getInitialState: function getInitialState() {
        return {};
    },
    render: function() {
        return React.createElement("div", null, [
            React.createElement("h2", null, "Benchmark Detail"),
            React.createElement("p", null, "Benchmark details for ...")
        ]);
    }
});