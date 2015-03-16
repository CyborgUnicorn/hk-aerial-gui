angular.module('hk-aerial-gui').controller('DualShockCtrl', function ($scope, DualShock) {
  
  $scope.controller = new DualShock();
  $scope.connected = false;

  this.connect = function () {
    $scope.controller.connect(function () {
      $scope.connected = true;
    });
  };

  $scope.$on('dualshock:change', function (event, data) {
    $scope.data = JSON.stringify(data, null, 2);
    $scope.$digest();
  });
});