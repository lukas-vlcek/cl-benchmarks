var DetailComponent = React.createClass({
    displayName: "DetailComponent",
    getInitialState: function getInitialState() {
        return {};
    },
    goToMasterPage: function() {
        page('/#/');
    },
    render: function() {
        // console.log(this.props);
        return React.createElement("div", null, [
            React.createElement("a", { onClick: this.goToMasterPage }, "<< Go back to master page"),
            React.createElement("h2", null, "Benchmark Detail"),
            React.createElement("p", null, [
                React.createElement("span", null, "Benchmark details for "),
                React.createElement("b", null, this.props.test_id),
                React.createElement("span", null, " / "),
                React.createElement("span", null, this.props.branch),
                React.createElement("span", null, " / "),
                React.createElement("span", null, this.props.series),
                React.createElement("span", null, " / "),
                React.createElement("span", null, new Date(parseInt(this.props.timestamp)).toUTCString())
            ])
        ]);
    }
});