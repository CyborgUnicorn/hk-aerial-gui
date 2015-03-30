angular.module('hk-aerial-gui').controller('DualShockCtrl', function ($scope, DualShock) {
  
  var vm = this;

  function activate() {
    vm.controller = DualShock.get();
    vm.controller.on('change', onControllerChange);
  }

  function onControllerChange() {
    $scope.$safeApply();
  }

  function destroy() {
    vm.controller.off('emit', onControllerChange);
  }

  $scope.$on('$destroy', destroy);
  activate();
});