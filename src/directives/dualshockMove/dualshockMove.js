angular.module('hk-aerial-gui').directive('dualshockMove', function (DualShock) {
  'use strict';

  return {
    restrict: 'E',
    replace: false,
    scope: {
      value: '='
    },
    templateUrl: 'directives/dualshockMove/dualshockMove.html',
    link: function (scope, element, attrs, fn) {
      var point = element.children()[0].children[0];

      scope.$watch('value', function () {
        if(scope.value) {
          point.style.left = (scope.value.x -1) + 'px';
          point.style.top = (scope.value.y -1) + 'px';
        }
      });
    }
  };
});