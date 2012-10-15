var io = require('socket.io').listen(2233);

io.configure(function () {
  io.set('transports', ['websocket', 'xhr-polling']);
});

// Socket Routes
io.sockets.on('connection', function (socket) {

  socket.on('newQuestion', function(question){
    if(question.name && question.question){
      question.name = question.name.trim();
      question.question = question.question.trim();
      socket.emit('updateQuestions', question);
      socket.broadcast.emit('updateQuestions', question);
    }
  });

});
