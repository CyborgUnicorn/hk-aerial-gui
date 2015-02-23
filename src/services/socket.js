angular.module('hk-aerial-gui').factory('Socket', function () {

  function Socket(host) {
    if(!host) { host = 'http://localhost:9001'; }
    this.socket = io(host);

    this.socket.on('connection', function () {
      console.log('connected');
    });
  }

  Socket.prototype.on = function () {
    this.socket.on.apply(this.socket, arguments);
  };

  Socket.prototype.emit = function () {
    this.socket.emit.apply(this.socket, arguments);
  };

  return Socket;
});