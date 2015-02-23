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
      }
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
          switch(event) {
            case 'left:move':
              self.data.left = data;
              break;
            case 'right:move':
              self.data.right = data;
              break;
            case 'r2:analog':
              self.data.r2 = data;
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
          }
          $rootScope.$emit('dualshock:change', self.data);
        });

        done();
      });
    });
    
    this.socket = socket;
  };

  return DualShock;
});