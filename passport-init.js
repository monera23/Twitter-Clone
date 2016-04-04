
var mongoose = require('mongoose');   
var User = require('./models/models');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt= require('bcrypt');

module.exports=function(passport){

	passport.serializeUser(function(user,done){
		console.log('serializing user: ',user.username);
		 done(null,user._id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			console.log('deserializing user:',user.username);
			done(err,user);

		});

		
	});

	passport.use('login',new LocalStrategy({
		passReqToCallback:  true
	}, function(req,username,password,done){
		
		user.findOne({'username': username},
			function(err,user){

				if(err)
					return done(err);

				if(!user)
				{
					console.log('User not found with username: '+username);
					return done(null,false);
				}

				if(!isValidPassword(user,password)){
					console.log('Invalid password');
					return done(null,false);
				}

				return done(null,false);

			});
	}
	));

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	},
	 	function(req,username,password,done){

	 		user.findOne({'username':username},function(err,user){

	 			if(err)
	 			{
	 				console.log('Error in signup');
	 				return done(err);
	 			}


	 			if(user)
	 			{
	 				console.log('user already exists with name: '+username);
	 				return done(null,false);
	 			}
	 			else
	 			{
	 				var newUser= new User();

	 				newUser.username=username;
	 				newUser.password=createHash(password);

	 				newUser.save(function(err){
	 					if(err){
	 						console.log('Error in saving');
	 						throw err;
	 					}
	 					console.log(newUser.username+ 'Registration Successful');
	 					return  done(null,newUser);
	 				});
	 			}

	 		});
	 		
	 	}
	));

	var isValidPass=function(user,password){
		return bcrypt.compareSync(password,user.password);
	};

	var createHash=function(password){
		return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
	};

};