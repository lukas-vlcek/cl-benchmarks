function Chart() {

    /**
     *
     * @param {HTMLElement} node
     * @param {String} fileURL
     * @param {function} onClick
     */
    this.generateChart = function(node, fileURL, onClick) {
        var test_id = node.getAttribute("id");
        if (test_id.startsWith(app.constant.CHART_PREFIX)) {
            test_id = test_id.substr(app.constant.CHART_PREFIX.length);
        }
        // console.log(element_id);
        var clickHandler = function(d, element) {
            onClick(d, test_id)
        };
        return c3.generate({
            bindto: node,
            data: {
                // x: 'date',
                xs: {
                    'Metric': 'x1',
                    'Time': 'x2'
                },
                xFormat: '%Y-%m-%dT%H:%M:%SZ',
                onclick: clickHandler,
                // json: []
                columns: [
                    ['x1',
                        '2016-01-01T19:15:28Z',
                        '2016-01-02T19:15:28Z',
                        '2016-01-03T19:15:28Z',
                        '2016-01-04T19:15:28Z',
                        '2016-01-05T19:15:28Z',
                        '2016-01-06T19:15:28Z'
                    ],
                    ['x2',
                        '2016-01-02T00:00:00Z',
                        '2016-01-03T10:00:00Z',
                        '2016-01-04T20:00:00Z',
                        '2016-01-05T10:00:00Z',
                        '2016-01-06T00:00:00Z',
                        '2016-01-07T10:00:00Z'
                    ],
                    ['Metric', 30, 200, 100, 400, 150, 250],
                    ['Time', 50, 20, 10, 40, 15, 25]
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });
    }
}
// Make our chart globally available
window._chart = new Chart();