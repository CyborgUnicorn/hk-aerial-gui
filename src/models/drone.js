angular.module('hk-aerial-gui').factory('Drone', function (EventEmitter, Socket) {
  'use strict';

  var _instance;

  function Drone() {
    this.connected = false;
    this.data = {};
  }

  Drone.prototype = Object.create(EventEmitter.prototype);
  Drone.prototype.constructor = Drone;

  Drone.prototype.connect = function (address) {
    this.socket = new Socket(address);
    this.socket.on('connect', this.onConnect.bind(this));
  };

  Drone.prototype.rc = function (roll, pitch, yaw, throttle) {
    if(this.connected) {
      this.socket.emit('setRawRc', roll, pitch, yaw, throttle, 0, 0, 0, 0);
    }
  };

  Drone.prototype.onConnect = function () {
    var self = this;
    var events = [
      'rc',
      'motor',
      'motorComputed',
      'servo',
      'attitude',
      'rawImu',
      'pid',
      'atomicServo',
      'range'
    ];

    events.forEach(function (eventName) {
      self.socket.on(eventName, function (data) {
        self.data[eventName] = data;
        self.emit('change');
      });
    });

    this.connected = true;
    this.emit('change');
  };

  Drone.get = function () {
    if(!_instance) {
      _instance = new Drone();
    }
    return _instance;
  };

  return Drone;
});