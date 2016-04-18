function TimeSeriesChart() {

    this.create = function(element) {

        var series = {};

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 900 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var accessDatetime = function(d) { return d.datetime; };
        var accessValue = function(d) { return d.value; };

        var xScale = d3.time.scale.utc()
            .range([0, width]);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        var line =  d3.svg.line()
            .interpolate("line")
            .x(function(d) { return xScale(d.datetime); })
            .y(function(d) { return yScale(d.value); });

        // create chart and bind to element
        // var svg = d3.select(element).append("svg")
        //         .attr("width", width + margin.left + margin.right)
        //         .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /* http://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js */
        var svg = d3.select(element)//.append("svg")
            // .append("div")
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            //responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 900 300")
            //class to make it responsive
            .classed("svg-content-responsive", true)//;
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chartXAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        var chartYAxis = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        /**
         * Update chart for every series or only for single series_id
         * @param {string?} series_id
         */
        var chartUpdate = function(series_id) {
            var data = null;
            if (series_id) {
                data = series[series_id];
            }
            if (data) {
                chartUpdateForData(series_id, data);
            } else {
                for (var key in series) {
                    if (series.hasOwnProperty(key)) {
                        chartUpdateForData(key, series[key]);
                    }
                }
            }
        };

        /**
         *
         * @param {string} series_id
         * @param {array} data
         */
        var chartUpdateForData = function(series_id, data) {
            console.log('xScale domain', xScale.domain());
            console.log('yScale domain', yScale.domain());

            var extentsDatetime = [];
            var extentsValue = [];
            for (var key in series) {
                if (series.hasOwnProperty(key)) {
                    var ser = series[key];
                    extentsDatetime.push(d3.extent(ser, accessDatetime));
                    extentsValue.push(d3.extent(ser, accessValue));
                }
            }
            var min_datetime = d3.min(extentsDatetime, function(d){ return d[0]});
            var max_datetime = d3.max(extentsDatetime, function(d){ return d[1]});
            var min_value = d3.min(extentsValue, function(d){ return d[0]});
            var max_value = d3.max(extentsValue, function(d){ return d[1]});

            console.log('min-max', min_datetime, max_datetime);

            // xScale.domain(d3.extent(data, accessDatetime));
            // yScale.domain(d3.extent(data, accessValue));
            xScale.domain([min_datetime, max_datetime]);
            yScale.domain([min_value, max_value]);

            chartXAxis.call(xAxis);
            chartYAxis.call(yAxis);

            // console.log(data);
            svg.append("path")
                .datum(data)
                .attr("class", "line " + series_id)
                .attr("d", line);
        };

        return {

            //
            addSeries: function(series_id, label, data) {

                if (series[series_id]) {
                    console.warn('Replacing series [' + series_id + '] with a new data!');
                }
                series[series_id] = data;
                chartUpdate(series_id);

                // svg.append("g")
                //     .attr("class", "x axis")
                //     .attr("transform", "translate(0," + height + ")")
                //     .call(xAxis);

                // chartXAxis.call(xAxis);

                // svg.append("g")
                //     .attr("class", "y axis")
                //     .call(yAxis);
                    // .append("text")
                    // .attr("transform", "rotate(-90)")
                    // .attr("y", 6)
                    // .attr("dy", ".71em")
                    // .style("text-anchor", "end")
                    // .text("Temperature (ºF)");
                // chartYAxis.call(yAxis);

                // var city = svg.selectAll(".series")
                //     .data(data)
                //     .enter().append("g")
                //     .attr("class", "series");
            },

            //
            disableSeries: function(series_id) {
                console.error("disableSeries method not implemented yet!");
            },

            //
            enableSeries: function(series_id) {
                console.error("enableSeries method not implemented yet!");
            }
        };
    }

}

// Make our chart globally available
window._TimeSeriesChart = new TimeSeriesChart();