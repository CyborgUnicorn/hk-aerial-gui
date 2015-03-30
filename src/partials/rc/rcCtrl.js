angular.module('hk-aerial-gui').controller('RcCtrl', function ($scope, normalize) {
  var vm = this;
  var normalizer = normalize.from(0, 255).to(1100, 1900);

  $scope.$on('dualshock:change', function (event, data) {
    vm.roll = normalizer.calc(-data.left.x);
    vm.pitch = normalizer.calc(-data.left.y);
    vm.yaw = normalizer.calc(-data.right.x);
    vm.throttle = normalizer.calc(data.r2.value);

    $scope.$safeApply();
  });
});