var dualShock = require('dualshock-controller');

function DualShock(options) {
  options = options || {
    config: 'dualShock3',
    acceleratorSmoothing: true,
    analogStickSmoothing: true
  };

  this.controller = dualShock(options);

  this.pipeEvents = this.pipeEvents.bind(this);
  this.disconnect = this.disconnect.bind(this);
  this.bindEvent = this.bindEvent.bind(this);

  this.eventListeners = {};
  this.socketListeners = {};

  this
    .bindEvent('left:move')
    .bindEvent('right:move')
    .bindEvent('l1:analog')
    .bindEvent('l2:analog')
    .bindEvent('r1:analog')
    .bindEvent('r2:analog')
    .bindEvent('circle:press')
    .bindEvent('circle:release')
    .bindEvent('triangle:press')
    .bindEvent('triangle:release')
    .bindEvent('square:press')
    .bindEvent('square:release')
    .bindEvent('x:press')
    .bindEvent('x:release')
    .bindEvent('select:press')
    .bindEvent('select:release')
    .bindEvent('start:press')
    .bindEvent('start:release')
    .bindEvent('dpadLeft:press')
    .bindEvent('dpadLeft:release')
    .bindEvent('dpadRight:press')
    .bindEvent('dpadRight:release')
    .bindEvent('dpadUp:press')
    .bindEvent('dpadUp:release')
    .bindEvent('dpadDown:press')
    .bindEvent('dpadDown:release')
    .bindEvent('psxButton:press')
    .bindEvent('psxButton:release')
    .bindEvent('leftAnalogBump:press')
    .bindEvent('leftAnalogBump:release')
    .bindEvent('rightAnalogBump:press')
    .bindEvent('rightAnalogBump:release')
    .bindEvent('rightLeft:motion')
    .bindEvent('forwardBackward:motion')
    .bindEvent('upDown:motion')
    .bindEvent('battery:change')
    .bindEvent('connection:change')
    .bindEvent('charging:change');

  this.controller.connect();
}

DualShock.prototype.bindEvent = function (eventName) {
  if(this.eventListeners[eventName]) {
    this.controller.off(eventName, this.eventListeners[eventName]);
  }
  this.eventListeners[eventName] = this.onEvent.bind(this, eventName);
  this.controller.on(eventName, this.eventListeners[eventName]);

  return this;
};

DualShock.prototype.onEvent = function (event, data) {
  console.log('event', event);
  var socketListeners = this.socketListeners;
  Object.keys(socketListeners).forEach(function (socketEvent) {
    var socket = socketListeners[socketEvent];
    socket.emit(socketEvent, event, data);
  });
};

DualShock.prototype.pipeEvents = function (socketEventName, socket) {
  this.socketListeners[socketEventName] = socket;
};

DualShock.prototype.disconnect = function() {
  this.controller.disconnect();
};

module.exports = DualShock;