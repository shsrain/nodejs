var express = require('express');
var router = express.Router();
Admin = require('../modules/frontend/controllers/Admin');
config = require('../config')(),
MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/fastdelivery', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};
        /* GET home page. */
        router.get('/', attachDB,function(req, res, next) {
          res.render('index', { title: 'Express' });
        });
        router.all('/admin*', attachDB,function(req, res, next) {
            
            Admin.run(req, res, next);
        });
    }
});
module.exports = router;
