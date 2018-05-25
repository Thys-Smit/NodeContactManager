var express = require('express');
var router = express.Router();
var sql = require('mssql');

/* GET users listing. */
router.get('/all', function(req, res, next) {

	var SQLRequest = new sql.Request();
	SQLRequest.query('SELECT * FROM users', (err, result) => {
		if (err) {
			res.status(401).send(err);
		} else {
			res.status(200).send(result.recordset);
		}
	});
  
});

router.post('/add', function(req, res, next){

	var SQLRequest = new sql.Request();
	SQLRequest.input('Name', req.body.name)
  	SQLRequest.input('Surname', req.body.surname)
	SQLRequest.execute('sp_InsertUser', (err, result) => {
		if (err) {
			res.status(401).send(err);
		} else {
			res.status(200).send(result);
		}
	});

});


module.exports = router;
