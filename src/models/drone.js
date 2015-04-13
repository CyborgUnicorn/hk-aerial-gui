angular.module('hk-aerial-gui').factory('Drone', function (EventEmitter, Socket, $timeout) {
  'use strict';

  var _instance;

  function Drone() {
    this.connected = false;
    this.wii = {};
    this.wii.connect = this.connectWii.bind(this);
    this.data = {};
    this.out = {
      roll: 1500,
      pitch: 1500,
      yaw: 1500,
      throttle: 1100
    };
  }

  Drone.prototype = Object.create(EventEmitter.prototype);
  Drone.prototype.constructor = Drone;

  Drone.prototype.connect = function (address) {
    this.socket = new Socket(address);
    this.socket.on('connect', this.onConnect.bind(this));
  };

  Drone.prototype.connectWii = function (device) {
    this.socket.emit('connectWii', device, this.onWiiConnect.bind(this));
    this.sendValues();
  };

  Drone.prototype.sendValues = function () {
    //console.log('send rc values', this.out.roll, this.out.pitch, this.out.yaw, this.out.throttle);
    this.socket.emit('setRawRc', this.out.roll, this.out.pitch, this.out.yaw, this.out.throttle, 0, 0, 0, 0);
    $timeout(this.sendValues.bind(this), 50);
  };

  Drone.prototype.rc = function (roll, pitch, yaw, throttle) {
    if(this.wii.connected) {
      this.out.roll = Math.round(roll);
      this.out.pitch = Math.round(pitch);
      this.out.yaw = Math.round(yaw);
      this.out.throttle = Math.round(throttle);
    }
  };

  Drone.prototype.onConnect = function () {
    var self = this;

    this.connected = true;
    this.emit('change');

    this.socket.emit('list', function (devices) {
      self.wii.devices = devices;
      self.emit('change');
    });
  };

  Drone.prototype.onWiiConnect = function () {
    var self = this;
    self.wii.connected = true;
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
        //console.log('Drone', eventName, data);
        self.data[eventName] = data;
        self.emit('change');
      });
    });
    self.emit('change');
  };

  Drone.get = function () {
    if(!_instance) {
      _instance = new Drone();
    }
    return _instance;
  };

  return Drone;
});