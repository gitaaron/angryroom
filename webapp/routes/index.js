/**
 * Module dependencies
 */
var express = require('express');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
indexRouter.route('/')
  .all(function (req, res) {
    res.render('index', {
      title: 'wtf'
    });
  });


queue = [];

indexRouter.get('/caller', function(req, res) {
    var ani = req.query.ani;
    var position = queue.indexOf(ani);
    if(position===-1) {
        queue.push(ani);
        position = queue.length-1;
    }
    res.end(JSON.stringify({position:position, queue:queue}));

});

indexRouter.get('/hangup', function(req, res) {
    queue.shift();
    res.end('ok');
});

indexRouter.get('/queue', function(req, res) {
    res.end(JSON.stringify({queue:queue}));
});

exports.indexRouter = indexRouter;
