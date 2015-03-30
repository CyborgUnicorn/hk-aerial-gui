angular.module('hk-aerial-gui').factory('DualShock', function ($rootScope, Socket, EventEmitter) {
  'use strict';

  var _instance;

  function DualShock() {
    this.data = {
      left: { x: 128, y: 128 },
      right: { x: 128, y: 128 },
      l1: 0,
      l2: 0,
      r1: 0,
      r2: 0,
      dpad: {
        up: false,
        right: false,
        down: false,
        left: false
      },
      rightLeft: {},
      forwardBackward: {},
      upDown: {}
    };

    this.connected = false;
  }

  DualShock.prototype = Object.create(EventEmitter.prototype);
  DualShock.prototype.constructor = DualShock;

  DualShock.prototype.connect = function () {
    var socket = new Socket();
    var self = this;

    socket.on('connect', function () {
      socket.emit('dualshock:connect', function (err) {
        if(err) { console.error(err); }
        else {
          self.connected = true;
          self.emit('change', self.data);
        }

        socket.on('dualshock', function (event, data) {
          switch(event) {
            case 'left:move':
              self.data.left = data;
              break;
            case 'right:move':
              self.data.right = data;
              break;
            case 'l1:analog':
              self.data.l1 = data;
              break;
            case 'l2:analog':
              self.data.l2 = data;
              break;
            case 'r1:analog':
              self.data.r1 = data;
              break;
            case 'r2:analog':
              self.data.r2 = data;
              break;
            case 'circle:press':
              self.data.circle = true;
              self.emit(event);
              break;
            case 'circle:release':
              self.data.circle = false;
              self.emit(event);
              break;
            case 'triangle:press':
              self.data.triangle = true;
              self.emit(event);
              break;
            case 'triangle:release':
              self.data.triangle = false;
              self.emit(event);
              break;
            case 'square:press':
              self.data.square = true;
              self.emit(event);
              break;
            case 'square:release':
              self.data.square = false;
              self.emit(event);
              break;
            case 'x:press':
              self.data.x = true;
              self.emit(event);
              break;
            case 'x:release':
              self.data.x = false;
              self.emit(event);
              break;
            case 'select:press':
              self.data.select = true;
              self.emit(event);
              break;
            case 'select:release':
              self.data.select = false;
              self.emit(event);
              break;
            case 'start:press':
              self.data.start = true;
              self.emit(event);
              break;
            case 'start:release':
              self.data.start = false;
              self.emit(event);
              break;
            case 'psxButton:press':
              self.data.psxButton = true;
              self.emit(event);
              break;
            case 'psxButton:release':
              self.data.psxButton = false;
              self.emit(event);
              break;
            case 'leftAnalogBump:press':
              self.data.leftAnalogBump = true;
              self.emit(event);
              break;
            case 'leftAnalogBump:release':
              self.data.leftAnalogBump = false;
              self.emit(event);
              break;
            case 'rightAnalogBump:press':
              self.data.rightAnalogBump = true;
              self.emit(event);
              break;
            case 'rightAnalogBump:release':
              self.data.rightAnalogBump = false;
              self.emit(event);
              break;
            case 'dpadLeft:press':
              self.data.dpad.left = true;
              self.emit(event);
              break;
            case 'dpadLeft:release':
              self.data.dpad.left = false;
              self.emit(event);
              break;
            case 'dpadRight:press':
              self.data.dpad.right = true;
              self.emit(event);
              break;
            case 'dpadRight:release':
              self.data.dpad.right = false;
              self.emit(event);
              break;
            case 'dpadUp:press':
              self.data.dpad.up = true;
              self.emit(event);
              break;
            case 'dpadUp:release':
              self.data.dpad.up = false;
              self.emit(event);
              break;
            case 'dpadDown:press':
              self.data.dpad.down = true;
              self.emit(event);
              break;
            case 'dpadDown:release':
              self.data.dpad.down = false;
              self.emit(event);
              break;
            case 'rightLeft:motion':
              self.data.rightLeft = data;
              break;
            case 'forwardBackward:motion':
              self.data.forwardBackward = data;
              break;
            case 'upDown:motion':
              self.data.upDown = data;
              break;
          }
          self.emit('change', self.data);
        });
      });
    });
    
    this.socket = socket;
  };

  DualShock.get = function () {
    if(!_instance) {
      _instance = new DualShock();
    }
    return _instance;
  };

  return DualShock;
});