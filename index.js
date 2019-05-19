
var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var io = require('socket.io')(http);

var port = process.env.PORT || 5000;
var connections = [];
var users = [];




app.use(express.static("public"));


app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
    
})




io.on('connection', function(socket){
    var usersID = socket.id.substr(7,5);
    connections.push(socket);
    users.push(usersID);
    updateUsers();
    console.log('Kullanici Sayisi: ',connections.length);
    

    socket.on('disconnect',function(data){
        users.splice(users.indexOf(usersID),1)
        updateUsers();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Kullanici Sayisi: ',connections.length);
    });

    socket.on('send message', function(msg){
        var info = [usersID , msg];
        io.emit('new message', info);
    });
 
    function updateUsers(){
        io.emit('get users',users);
    }
    
});



http.listen(port,function(){
    console.log('listening on *:5000');
})
