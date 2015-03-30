angular.module('hk-aerial-gui').controller('DroneCtrl', function ($scope, normalize, DualShock, Drone) {
  var normalizer = normalize.from(0, 255).to(1100, 1900);
  var vm = this;
  vm.droneAddress = null;

  function activate() {
    vm.controller = DualShock.get();
    vm.controller.on('change', onControllerChange);

    vm.drone = Drone.get();
    vm.drone.on('change', onDroneChange);
  }

  function connect() {
    vm.drone.connect(vm.droneAddress);
  }

  function onControllerChange() {
    var data = vm.controller.data;
    
    vm.roll = normalizer.calc(data.left.x);
    vm.pitch = normalizer.calc(data.left.y);
    vm.yaw = normalizer.calc(data.right.x);
    vm.throttle = normalizer.calc(data.r2);

    $scope.$safeApply();
  }

  function onDroneChange() {
    $scope.$safeApply();
  }

  function destroy() {
    vm.controller.off('change', onControllerChange);
    vm.drone.off('change', onDroneChange);
  }

  $scope.$on('$destroy', destroy);
  activate();
});