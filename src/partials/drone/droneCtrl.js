angular.module('hk-aerial-gui').controller('DroneCtrl', function ($scope) {
  $scope.$on('dualshock:change', function (event, data) {
    
    $scope.roll = data.rightLeft.value;
    $scope.pitch = data.forwardBackward.value;
    $scope.altitude = data.l1;
    $scope.degrees = data.left.x;

    $scope.$digest();
  });
});