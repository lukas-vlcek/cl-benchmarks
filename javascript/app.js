/**
 * Copyright 2016 Red Hat
 * @author Lukas Vlcek lvlcek@redhat.com
 */

var App = function() {

    var thiz = this;

    this.dataClick = function(d, element) {
        var fragment = [
                [ 'id=', encodeURI(String(d.id)) ].join(''),
                [ 'x=', String(d.x.getTime()) ].join('')
            ].join('&');
        // console.log(d);
        // console.log(fragment);
        window.location.href = [ 'detail.html', fragment ].join('#');
    };

    this.generateGraph = function (element_id) {
        var chart = c3.generate({
            bindto: element_id,
            data: {
                // x: 'date',
                xs: {
                    'CPU': 'x1',
                    'IO': 'x2'
                },
                xFormat: '%Y-%m-%dT%H:%M:%SZ',
                onclick: thiz.dataClick,
                // json: []
                columns: [
                    ['x1',
                        '2013-01-01T19:15:28Z',
                        '2013-01-02T19:15:28Z',
                        '2013-01-03T19:15:28Z',
                        '2013-01-04T19:15:28Z',
                        '2013-01-05T19:15:28Z',
                        '2013-01-06T19:15:28Z'
                    ],
                    ['x2',
                        '2013-01-02T00:00:00Z',
                        '2013-01-03T10:00:00Z',
                        '2013-01-04T20:00:00Z',
                        '2013-01-05T10:00:00Z',
                        '2013-01-06T00:00:00Z',
                        '2013-01-07T10:00:00Z'
                    ],
                    ['CPU', 30, 200, 100, 400, 150, 250],
                    ['IO', 50, 20, 10, 40, 15, 25]
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

        /*
        // Loading data this way seems to break tooltip behaviour.
        setTimeout(function() {
            chart.load({
                json: [
                    { date: '2013-01-01T19:15:28Z', CPU: 30 },
                    { date: '2013-01-02T19:15:28Z', CPU: 200 },
                    { date: '2013-01-03T19:15:28Z', CPU: 100 },
                    { date: '2013-01-04T19:15:28Z', CPU: 400 },
                    { date: '2013-01-05T19:15:28Z', CPU: 150 },
                    { date: '2013-01-06T19:15:28Z', CPU: 250 }
                ],
                keys: {
                    x: 'date',
                    value: ['CPU']
                }
            });
            console.log('load CPU...', chart);
        }, 500);

        setTimeout(function() {
            chart.load({
                json: [
                    { date: '2013-01-02T00:00:00Z', IO: 50 },
                    { date: '2013-01-03T10:00:00Z', IO: 20 },
                    { date: '2013-01-04T20:00:00Z', IO: 10 },
                    { date: '2013-01-05T10:00:00Z', IO: 40 },
                    { date: '2013-01-06T00:00:00Z', IO: 15 },
                    { date: '2013-01-07T10:00:00Z', IO: 25 }
                ],
                keys: {
                    x: 'date',
                    value: ['IO']
                }
            });
            console.log('load IO...', chart);
        }, 1500);
        */
    }
};

app = new App();
/*
(function (context) {

    app.generateGraph("#chart-perf-test-operations");

})(this);
*/
