angular.module('hk-aerial-gui').directive('dualshockAnalog', function () {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '='
    },
    templateUrl: 'directives/dualshockAnalog/dualshockAnalog.html',
    link: function (scope, element, attrs, fn) {
      
    }
  };
});