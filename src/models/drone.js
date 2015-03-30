angular.module('hk-aerial-gui').factory('Drone', function (EventEmitter, Socket) {
  'use strict';

  var _instance;

  function Drone() {

  }

  Drone.prototype = Object.create(EventEmitter.prototype);
  Drone.prototype.constructor = Drone;

  Drone.prototype.connect = function (address) {
    this.socket = new Socket(address);
    this.socket.on('connect', this.onConnect.bind(this));
  };

  Drone.prototype.onConnect = function () {
    this.socket.on('motors', this.onMotors.bind(this));
    this.socket.on('rc', this.onRc.bind(this));
  };

  Drone.prototype.onMotors = function (data) {

  };

  Drone.prototype.onRc = function (data) {

  };

  Drone.get = function () {
    if(!_instance) {
      _instance = new Drone();
    }
    return _instance;
  };

  return Drone;
});