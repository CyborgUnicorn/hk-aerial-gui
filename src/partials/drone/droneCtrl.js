angular.module('hk-aerial-gui').controller('DroneCtrl', function ($scope, normalize, DualShock, Drone) {
  
  var step = 1;

  var vm = this;
  vm.droneAddress = 'http://192.168.43.238:3000';
  vm.wiiDevice = null;
  vm.throttle = {min: 1100, max: 1900, middle: 1100, value: 1100, on: true};
  vm.roll = {min: 1400, max: 1600, middle: 1500, value: 1500};
  vm.pitch = {min: 1400, max: 1600, middle: 1500, value: 1500};
  vm.yaw = {min: 1100, max: 1900, middle: 1500, value: 1500};

  vm.connect = connect;

  function activate() {
    vm.controller = DualShock.get();
    vm.controller.on('change', onControllerChange);

    vm.controller.on('dpadLeft:press', onLeft);
    vm.controller.on('dpadRight:press', onRight);
    
    vm.controller.on('dpadUp:press', onUp);
    vm.controller.on('dpadDown:press', onDown);
    
    vm.controller.on('square:press', onSquare);
    vm.controller.on('circle:press', onCircle);

    vm.controller.on('start:press', onStart);

    vm.drone = Drone.get();
    vm.drone.on('change', onDroneChange);
  }

  function connect(address) {
    vm.drone.connect(address);
  }

  function onLeft() { vm.roll.min -= step; vm.roll.max -= step; vm.roll.middle -= step; }
  function onRight() { vm.roll.min += step; vm.roll.max += step; vm.roll.middle += step; }
  
  function onUp() { vm.pitch.min -= step; vm.pitch.max -= step; vm.pitch.middle -= step; }
  function onDown() { vm.pitch.min += step; vm.pitch.max += step; vm.pitch.middle += step; }
  
  function onSquare() { vm.yaw.min -= step; vm.yaw.max -= step; vm.yaw.middle -= step; }
  function onCircle() { vm.yaw.min += step; vm.yaw.max += step; vm.yaw.middle += step; }

  function onStart() { vm.throttle.on = !vm.throttle.on; }

  function onControllerChange() {
    var data = vm.controller.data;
    
    vm.roll.value = normalize
      .from(0, 255)
      .to(vm.roll.min, vm.roll.max)
      .cubic(data.left.x);

    vm.pitch.value = normalize
      .from(0, 255)
      .to(vm.pitch.min, vm.pitch.max)
      .cubic(data.left.y);

    vm.yaw.value = normalize
      .from(0, 255)
      .to(vm.yaw.min, vm.yaw.max)
      .cubic(data.right.x);

    vm.throttle.value = (vm.throttle.on) ? normalize
      .from(0, 255)
      .to(vm.throttle.min, vm.throttle.max)
      .linear(data.r2) : 0;

    vm.drone.rc(vm.roll.value, vm.pitch.value, vm.yaw.value, vm.throttle.value);

    $scope.$safeApply();
  }

  function onDroneChange() {
    $scope.$safeApply();
  }

  function destroy() {
    vm.controller.off('change', onControllerChange);
    vm.controller.off('dpadLeft:press', onLeft);
    vm.controller.off('dpadRight:press', onRight);
    vm.controller.off('dpadUp:press', onUp);
    vm.controller.off('dpadDown:press', onDown);
    vm.controller.off('square:press', onSquare);
    vm.controller.off('circle:press', onCircle);
    vm.controller.off('start:press', onStart);
    vm.drone.off('change', onDroneChange);
  }

  $scope.$on('$destroy', destroy);
  activate();
});