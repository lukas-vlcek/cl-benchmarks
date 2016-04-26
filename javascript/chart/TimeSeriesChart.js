/**
 * Time series chart.
 *
 * @author Lukas Vlcek (lvlcek@redhat.com)
 */

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

        var lineX =  d3.svg.line()
            .interpolate("line")
            .x(function(d) { return xScale(d.datetime); })
            .y(function(d) { return yScale.range()[0]; });

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

        var voronoi = d3.geom.voronoi()
            // .clipExtent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);
            .clipExtent([[0,0], [width, height ]]);

        var voronoi_paths = svg.append("g").attr("id", "point-paths");
        var chart_content = svg.append("g").attr("id", "chart-content");

        /**
         * Update chart for all series
         */
        var chartUpdate = function() {
            updateChartAxis();
            updateDate();
        };

        var updateChartAxis = function() {

            // calculate extent for each series
            var extentsDatetime = [];
            var extentsValue = [];
            for (var key in series) {
                if (series.hasOwnProperty(key)) {
                    var ser = series[key];
                    extentsDatetime.push(d3.extent(ser, accessDatetime));
                    extentsValue.push(d3.extent(ser, accessValue));
                }
            }

            // select global min/max from all extents
            var min_datetime = d3.min(extentsDatetime, function(d){ return d[0]});
            var max_datetime = d3.max(extentsDatetime, function(d){ return d[1]});
            var min_value = d3.min(extentsValue, function(d){ return d[0]});
            var max_value = d3.max(extentsValue, function(d){ return d[1]});

            // update chart scales
            xScale.domain([min_datetime, max_datetime]);
            yScale.domain([min_value, max_value]);

            // update chart
            chartXAxis.transition().duration(500).call(xAxis);
            chartYAxis.transition().duration(500).call(yAxis);
        };

        var updateDate = function() {

            var CIRCLE_CLASS = "circle";
            var data = [];
            for (var key in series) {
                if (series.hasOwnProperty(key)) {
                    data.push({ key: key, values: series[key] });

                    var vertices = series[key].map(function(item) { return [xScale(item.datetime), yScale(item.value)]});

                    var circle = chart_content.selectAll("circle." + key).data(series[key]);

                    circle.enter().append("circle")
                        .attr("class", function() { return CIRCLE_CLASS + " " + key })
                        .style("opacity", 0)
                        .attr("cx", function(d) { return xScale(d.datetime) })
                        .attr("cy", function() { return yScale.range()[0] })
                        .attr("r", 2.5)
                        .on({
                            click: function(d,i) { console.log(d, i, this); },
                            mouseover: function(d,i) { d3.select(this).attr("r", 4.5); },
                            mouseout: function(d,i) { d3.select(this).attr("r", 2.5); }
                        });

                    circle.transition().duration(500)
                        .style("opacity", 1)
                        .attr("cx", function(d) { return xScale(d.datetime) })
                        .attr("cy", function(d) { return yScale(d.value) });

                    // we have to remove exiting circles later... see below
                    // circle.exit().remove();
                }
            }

            var path = chart_content.selectAll("path").data(data, function(k) { return k.key });

            path.enter().append("path")
                  .attr("class", function(d) { return "line " + d.key } )
                  .style("opacity", 0)
                  .attr("d", function(d) { return lineX(d.values) });

            path.transition().duration(500)
                .attr("d", function(d) { return line(d.values) } )
                .style("opacity", 1).each("end", function() { // TODO: this needs to be called only once!

                    // console.log("voronoi", vertices);

                    var v = voronoi_paths.selectAll("path").data(voronoi(vertices));
                    v.enter().append("path")
                      .attr("class", "voronoi")
                      // .attr("clip-path", function(d,i) { return "url(#clip-"+i+")"; })
                      .style("fill", d3.rgb(230, 230, 230))
                      .style('fill-opacity', 0.4)
                      .style("stroke", d3.rgb(200,200,200));

                    v.attr("d", function(d) { return "M" + d.join(",") + "Z"; })
                     .attr("id", function(d,i) { return "path-"+i; });

                    v.exit().remove();
            });

            path.exit().transition().duration(500)
                .style("opacity", 0).remove();

            // remove exiting circles
            var found_classes = {};
            chart_content.selectAll("circle").each(function() {
                var classes = d3.select(this).attr("class").split(" ").filter(function(value) { return value != CIRCLE_CLASS });
                classes.forEach(function(value) { found_classes[value] = true});
            });
            d3.keys(found_classes).forEach(function(className) {
                if (!series.hasOwnProperty(className)) {
                    // console.log("remove circle elements with", className);
                    chart_content.selectAll("circle." + className).transition().duration(500)
                        .style("opacity", 0).remove();
                }
            });
        };

        return {

            /**
             * Add series of data to the chart and update the chart.
             *
             * @param {string} series_id
             * @param {string} label
             * @param {array.<{ datetime: number, value: number }>} data
             */
            addSeries: function(series_id, label, data) {

                if (series[series_id]) {
                    console.warn('Replacing series [' + series_id + '] with a new data!');
                }
                series[series_id] = data;
                chartUpdate();

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

            removeSeries: function(series_id) {
                delete series[series_id];
                chartUpdate();
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