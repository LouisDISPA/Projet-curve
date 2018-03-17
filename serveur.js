var express = require('express');

var app = express();
var server = app.listen(30000);

app.use(express.static('public'));

var socket = require('socket.io');

console.log("server runnig");

var io = socket(server);
var players = [];
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  var o = players.push(socket.id);
  if (o <= 3) socket.broadcast.emit('reste');
  console.log('new connection: ' + socket.id + '    number: ' + o);
  //io.emit('spectator', o);
  socket.emit('playerNumber', o);

  socket.on('position1', position1);
  socket.on('position2', position2);
  socket.on('position3', position3);
  socket.on('reset', reset);
  socket.on('disconnecting', deco);


  function position1(data) {
    socket.broadcast.emit('pos1', data);
  }

  function position2(data) {
    socket.broadcast.emit('pos2', data);
  }

  function position3(data) {
    socket.broadcast.emit('pos3', data);
  }

  function reset(){
    io.emit('reste');
  }

  function deco() {
    for (var i = 0; i < players.length; i++) {
      if (players[i] == socket.id) {
        p = i+1;
      }
    }
    if (players[3] && p == 3) {
      players.splice(3, 1);
    } else if (players[3] && p == 1) {
      players.splice(0, 1, players[3]);
    } else {
      players.splice(p-1, 1);
    }
    console.log('disconnection: ' + socket.id + '    number: ' + p);
    for (var i = 0; i < players.length; i++) {
      socket.to(players[i]).emit('playerNumber', i+1);
    }
    if (p <= 3) {
      io.emit('reste');
    }
    //io.emit('spectator', players.length);
  }

}
