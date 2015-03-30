var app = require('http').createServer();
var io = require('socket.io')(app);
var DualShock = require('./dualshock');

app.listen(9001);

var controller;

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('dualshock:connect', function (callback) {
    if(!controller) {
      controller = new DualShock({
        config: 'dualShock3',
        acceleratorSmoothing: true,
        analogStickSmoothing: true
      });
    }
    controller.pipeEvents('dualshock', socket);
    callback();
    console.log('dualshock connected');
  });
});