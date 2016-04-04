//var mongoose = require('mongoose');   
//var User = mongoose.model('User');
var express=require('express');
var router= express.Router();

module.exports=function(passport){

	router.get('/success',function(req,res){
		res.send({state: 'success', user: req.user ? req.user : null});
	});

	router.get('/failure',function(req,res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	//login 

	router.post('/login',passport.authenticate('login',{
		successRedirect: '/auth/success',
		failureRedirect: 'auth/failure'
	}));

	//signup

	router.post('/signup',passport.authenticate('signup',{
		successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
	}));

	router.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});

	return router;

}