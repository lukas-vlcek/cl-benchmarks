/**
 * Created by lvlcek on 31/03/16.
 */
(function (context) {

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            xs: {
                'data1': 'x1',
                'data2': 'x2'
            },
            columns: [
                ['x1', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['x2', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07'],
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
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

})(this);
