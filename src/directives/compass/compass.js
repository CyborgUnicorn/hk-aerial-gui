angular.module('hk-aerial-gui').directive('compass', function () {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      degrees: '='
    },
    templateUrl: 'directives/compass/compass.html',
    link: function (scope, element, attrs, fn) {

      function render() {
        if(scope.degrees !== undefined) {
          scope.compassRotation = scope.degrees;
        }
      }

      scope.$watch('degrees', render);
    }
  };
});