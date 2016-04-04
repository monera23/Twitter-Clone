
var express =require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');

function isAuthenticated(req,res,next){

	if(req.method==="GET")
	{
		return next();
	}

	if(req.isAuthenticated()){
		return next();
	}

	return res.redirect('/#login');

};

router.use('/posts',isAuthenticated);

router.route('/posts')
.post(function(req,res){
	
	var post = new Post();

	post.text=req.body.text;
	post.created_by=req.body.created.by;

	post.save(function(err,post){
		if(err)
			return res.send(500,err);

		else
			return res.json(post);
	});

})
.get(function(req,res){

	Post.find(function(err,posts){
		if(err)
			return res.send(500,err);

		else
			return res.json(posts);

	});
})

router.route('/posts/:id')
.put(function(req,res){
	
	Post.findById(req.params.id,function(err,post){
		if(err)
			return res.send(err);

		post.created_by=req.bodycreated_by;
		post.text=req.body.text;

		post.save(function(err,post){
			if(err)
				return res.send(err);

			else
				res.json(post);
		});
	});

})
.get(function(req,res){
	
	Post.findById(req.params.id,function(err,post){
		if(err)
			return res.send(err);

		else
			res.json(post);
	});


})
.delete(function(req,res){
	Post.remove({
		_id: req.params.id
	}, function(err){
		if(err)
			return res.send(err);

		res.json("deleted post !!");
	})
});


module.exports=router;