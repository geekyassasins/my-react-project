
var express=require('express');
var router=express.Router();
var mongo=require('mongodb');
var assert=require('assert');
var url='mongodb://localhost:27017/test';
router.get('/',function(req,res,next){
	res.render('index');
	
});
router.get('/getdata',function(req,res,next){
	var resultArray=[];
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		var cursor=db.collection('user-data').find();
		cursor.forEach(function(doc,err){
			assert.equal(null,err);
			resultArray.push(doc);
			
		},function(){
			db.close();
			res.render('index',{items:resultArray});
		});
		
	});
	
});
router.post('/',function(req,res,next){
	var item={
		fname:req.body.fname
	};
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('user-data').insertOne(item,function(err,result){
			assert.equal(null,err);
			console.log('Item inserted');
			db.close();
		});
	});
	
	res.redirect('/');
});
module.exports=router;


