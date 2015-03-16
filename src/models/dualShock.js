angular.module('hk-aerial-gui').factory('DualShock', function ($rootScope, Socket) {
  'use strict';

  function DualShock() {
    this.data = {
      left: { x: 0, y: 0 },
      right: { x: 0, y: 0 },
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
  }

  DualShock.prototype.connect = function (done) {
    var socket = new Socket();
    var self = this;

    socket.on('connect', function () {
      socket.emit('dualshock:connect', function (err) {
        if(err) { console.error(err); }
        else { console.log('dualshock connected'); }

        socket.on('dualshock', function (event, data) {
          console.log(event);
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
              break;
            case 'circle:release':
              self.data.circle = false;
              break;
            case 'triangle:press':
              self.data.triangle = true;
              break;
            case 'triangle:release':
              self.data.triangle = false;
              break;
            case 'square:press':
              self.data.square = true;
              break;
            case 'square:release':
              self.data.square = false;
              break;
            case 'x:press':
              self.data.x = true;
              break;
            case 'x:release':
              self.data.x = false;
              break;
            case 'select:press':
              self.data.select = true;
              break;
            case 'select:release':
              self.data.select = false;
              break;
            case 'start:press':
              self.data.start = true;
              break;
            case 'start:release':
              self.data.start = false;
              break;
            case 'psxButton:press':
              self.data.psxButton = true;
              break;
            case 'psxButton:release':
              self.data.psxButton = false;
              break;
            case 'leftAnalogBump:press':
              self.data.leftAnalogBump = true;
              break;
            case 'leftAnalogBump:release':
              self.data.leftAnalogBump = false;
              break;
            case 'rightAnalogBump:press':
              self.data.rightAnalogBump = true;
              break;
            case 'rightAnalogBump:release':
              self.data.rightAnalogBump = false;
              break;
            case 'dpadLeft:press':
              self.data.dpad.left = true;
              break;
            case 'dpadLeft:release':
              self.data.dpad.left = false;
              break;
            case 'dpadRight:press':
              self.data.dpad.right = true;
              break;
            case 'dpadRight:release':
              self.data.dpad.right = false;
              break;
            case 'dpadUp:press':
              self.data.dpad.up = true;
              break;
            case 'dpadUp:release':
              self.data.dpad.up = false;
              break;
            case 'dpadDown:press':
              self.data.dpad.down = true;
              break;
            case 'dpadDown:release':
              self.data.dpad.down = false;
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
          $rootScope.$broadcast('dualshock:change', self.data);
        });

        done();
      });
    });
    
    this.socket = socket;
  };

  return DualShock;
});