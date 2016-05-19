var express=require('express');
var app=express();
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var path=require('path');

mongoose.connect('mongodb://localhost/Form1');

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());


console.log("App Listing on port 8080");

var Todo=mongoose.model('Todo',{
	text:String
});



app.get('/api/todos',function(req,res){
	Todo.find(function(err,todos)
		{
			if(err)
			{
				res.send(err);
			}
			
			res.json(todos);
		
		});
});

app.post('/api/todos',function(req,res)
{
	Todo.create({
		text:req.body.text,
		done:false
	},function(err,todo){

		if(err)
		{
			res.sed(err);
		}
		Todo.find(function(req,todos)
			{
				if(err)
				{
					
					res.send(err);
				}
				res.send(todos);
			});
	});
});

app.delete('/api/todos/:todo_id',function(req,res){

 	Todo.remove({_id:req.params.todo_id},function(err,todo)
 	{
 		if(err)
 		{
 			res.send(err);
 		}

 		Todo.find(function(err,todos){
 			if(err)
 			{
 				res.send(err);
 			}
 			res.json(todos);
 		});
 	});
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname +'/public/wish.html'));
});

app.listen(8080);