var io = require('socket.io').listen(2233);

io.configure(function () {
  io.set('transports', ['websocket', 'xhr-polling']);
});

// Socket Routes
io.sockets.on('connection', function (socket) {

  socket.on('setPresenter', function(){
    socket.set('presenter', true, function(){
      socket.emit('ready');
    });
  });

  socket.on('slideChanged', function(slideIndex){
    socket.get('presenter', function(err, isPresenter){
      if(isPresenter){
        io.sockets['in']('viewers').emit('changeSlide', slideIndex);
      }
    });
  });

  socket.on('joinViewer', function(){
    socket.join('viewers');
  });

  socket.on('leaveViewer', function(){
    socket.leave('viewers');
  });

  socket.on('newQuestion', function(question){
    if(question.name && question.question){
      question.name = question.name.trim();
      question.question = question.question.trim();
      socket.emit('updateQuestions', question);
      socket.broadcast.emit('updateQuestions', question);
    }
  });

});
