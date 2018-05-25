var express = require('express');
var router = express.Router();
var sql = require('mssql');


/* GET all contacts from all users. */
router.get('/all', function(req, res, next) {

	var SQLRequest = new sql.Request();
	SQLRequest.query('SELECT contactId, name, surname FROM contacts', (err, result) => {
		if (err) {
		  res.status(401).send(err);
		} else {
		  res.status(200).send(result.recordset);
		}
	});

});


/* POST add a contact for a specific user */
router.post('/user/:id/add', function(req, res, next) {

	// TODO: Validate the body for required fields
	if (!req.params.id || isNaN(req.params.id)){
		res.status(400).send('The id is not a number or is not provided');
		return
	} 
	
	var SQLRequest = new sql.Request();
	SQLRequest.input('Name', req.body.name)
  	SQLRequest.input('Surname', req.body.surname)
  	SQLRequest.input('CellNumber', req.body.cellNo)
  	SQLRequest.input('WorkNumber', req.body.work ? req.body.workNo : "")
  	SQLRequest.input('id', req.params.id)
	SQLRequest.execute(`sp_AddContact`, (err, result) => {
		if (err) {
			res.status(401).send(err);
		} else {
			res.status(200).send(result);
		}
	});

});


/* GET all contacts from a specific user */
router.get('/user/:id/all', function(req, res, next) {

	if (!req.params.id || isNaN(req.params.id)){
		res.status(400).send('The id is not a number or is not provided');
		return
	} 

	var SQLRequest = new sql.Request();
	SQLRequest.query(`SELECT contactId, name, surname FROM contacts WHERE fkUserId = ${req.params.id}`, (err, result) => {
		if (err) {
			res.status(401).send(err);
		} else {
			res.status(200).send(result);
		}
	});

});


/* GET details of a specific contact. */
router.get('/details/:id', function(req, res, next) {

	if (!req.params.id || isNaN(req.params.id)){
		res.status(400).send('The id is not a number or is not provided');
		return
	} 

	var SQLRequest = new sql.Request();
	SQLRequest.query(`SELECT * FROM contacts WHERE contactId = ${req.params.id}`, (err, result) => {
		if (err) {
			res.status(401).send(err);
		} else {
			res.status(200).send(result);
		}
	});

});


/* PATCH update a contact for a specific user */
router.patch('/user/:id/update', function(req, res, next) {
	res.send('api not implemented');
});

module.exports = router;