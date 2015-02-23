var app = require('http').createServer();
var io = require('socket.io')(app);
var DualShock = require('./dualshock');

app.listen(9001);

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('dualshock:connect', function (callback) {
    /*var controller = dualShock({
      config: 'dualShock3',
      acceleratorSmoothing: true,
      analogStickSmoothing: true
    });

    controller.on('connected', function (data) {
      console.log('dual shock connected', data);
    });

    controller.on('left:move', function (data) { console.log('left', data); });
    controller.on('right:move', function (data) { console.log('right', data); });
    controller.on('r2:analog', function (data) { console.log('r2', data); });
    controller.on('circle:press', function (data) { console.log('circle', data); });

    controller.connect();
    console.log('connecting to dual shock');*/

    var controller = new DualShock({
      config: 'dualShock3',
      acceleratorSmoothing: true,
      analogStickSmoothing: true
    });
    controller.pipeEvents('dualshock', socket);
    callback();
  });
});