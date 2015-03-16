angular.module('hk-aerial-gui').factory('Drone', function (EventEmitter, Socket) {
  'use strict';

  function Drone() {

  }

  Drone.prototype.connect = function (address) {
    this.socket = new Socket(address);
  };

  return Drone;
});