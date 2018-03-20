var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/battle');
app.use(express.static(__dirname + '/battle/dist'));

var Schema = mongoose.Schema;
var PlayerSchema = new mongoose.Schema({
    username: {type: String, required: true},
    score: {type: Number, required: true},
    image: {type: String, required: true, default:''},
}, {timestamps: true});
var Player = mongoose.model('Player', PlayerSchema);
mongoose.Promise = global.Promise;

app.post('/create', function(req, res){
    console.log(req.body);
    var player = new Player({username: req.body.username, image: req.body.image, score: req.body.score});
    player.save(function(err){
        if(err){
            res.json({message: 'Error', data: err});
        }else{
            res.json({message: 'Creation Successful', data: player});
        }
    })
})
app.get('/two', function(req, res){
    Player.find({}).sort('-createdAt').limit(2).exec(function(err, authors){
        if(err){
            res.json({message: 'Error', error:err});
        }else{
            res.json({message: 'Find Successful', data: authors});
        }
    })
})
app.get('/players', function(req, res){
    Player.find({}).sort('-score').exec(function(err, players){
        if(err){
            res.json({message: 'Error', error: err});
        }else{
            res.json({message: 'Find All', data: players});
        }
    })
})
app.get('/player/:username', function(req, res){
    Player.find({username: req.params.username}, function(err, player){
        if(err){
            res.json({message: 'Error', error: err});
        }else{
            res.json({message: 'Found one', data: player});
        }
    })
})

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./battle/dist/index.html'));
})
app.listen(8000, function(){
    console.log('Listening on port 8000')
});