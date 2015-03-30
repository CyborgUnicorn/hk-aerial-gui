angular.module('hk-aerial-gui').directive('artificialHorizon', function () {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      roll: '=',
      pitch: '='
    },
    templateUrl: 'directives/artificialHorizon/artificialHorizon.html',
    link: function (scope, element, attrs, fn) {
      function render() {
        if(scope.roll !== undefined && scope.pitch !== undefined) {
          scope.rollRotation = scope.roll;
          scope.pitchOffset = scope.pitch * 25;
        }
      }
      scope.$watchGroup(['pitch', 'roll'], render);
    }
  };
});