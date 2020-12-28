var express = require('express');
var app = express();var mongojs = require ('mongojs');
var db = mongojs('persons' , ['persons']);
var bodyParser = require("body-parser");
var port = 8080;
app.use(bodyParser.json());
app.use(express.static(__dirname +'/' ));
app.get('/persons',function(req, res) {
  
    db.persons.find(function(err,docs)
    {
        console.log(docs);
        res.json(docs);
    })
});
app.post('/persons',function(req,res)
{
    console.log(req.body);
    db.persons.insert(req.body,function(err,doc)
    {
        res.json(doc);
    })

       

});
   



app.delete('/persons/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.persons.remove({_id: mongojs.ObjectId(id)} , function(err,doc)
    {
        res.json(doc);
    })
});

app.put('/persons/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
 
    db.persons.findAndModify({
        query:{_id: mongojs.ObjectId(id)},
        update:{$set:{
            name:req.body.name,
            number:req.body.number,
            email:req.body.email}},
            new:true
        }, function(err, doc) 
        {
             res.json(doc);
         })
   
})



app.listen(port, () => console.log(8080));
