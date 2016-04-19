var MasterComponent = React.createClass({
    displayName: "MasterComponent",
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
                console.log(ex);
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
                    React.createElement("p", null, "There are no tests configured for display.")
                );
            }
        }
        return React.createElement("div", null, elements);
    },
    componentDidUpdate: function() {
        for (var i in this.state.tests_metadata) {
            var test = this.state.tests_metadata[i];
            if (test.chart_enabled) {
                var element_id = AppConstant.CHART_PREFIX + test.code;
                var element = document.getElementById(element_id);
                var x_element = document.getElementById('x_' + element_id);
                var chart = _chart.generateChart(element, "", this.props.chartClickHandler);
                var x_chart = _TimeSeriesChart.create(x_element);

                // console.log(x_element);

                x_chart.addSeries("series_id1", "Label1", [
                    {datetime: 1461121928625, value: 10},
                    {datetime: 1461322929625, value: 20},
                    {datetime: 1461623930625, value: 15},
                    {datetime: 1461924932625, value: 30}
                ]);

                setTimeout(
                    function () {
                        x_chart.addSeries("series_id2", "Label2", [
                            {datetime: 1461253928625, value: -5},
                            {datetime: 1461354929625, value: 15},
                            {datetime: 1461655930625, value: 55},
                            {datetime: 1461956932625, value: 20}
                        ]);
                    }, 2000);

                setTimeout(
                    function () {
                        x_chart.removeSeries("series_id1");
                    }, 4000);
            }
        }
    }
});