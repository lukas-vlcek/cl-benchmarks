/**
 * Created by lvlcek on 31/03/16.
 */

var App = function() {
  this.generateGraph = function(element_id) {
      /*var chart = */ c3.generate({
          bindto: element_id,
          data: {
              xs: {
                  'CPU': 'x1',
                  'IO': 'x2'
              },
              xFormat: '%Y-%m-%dT%H:%M:%SZ',
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
  }
};

app = new App();
/*
(function (context) {

    app.generateGraph("#chart-perf-test-operations");

})(this);
*/
