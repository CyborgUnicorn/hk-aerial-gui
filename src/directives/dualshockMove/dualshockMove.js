angular.module('hk-aerial-gui').directive('dualshockMove', function ($rootScope) {
  'use strict';

  return {
    restrict: 'E',
    replace: false,
    scope: {
      control: '='
    },
    templateUrl: 'directives/dualshockMove/dualshockMove.html',
    link: function (scope, element, attrs, fn) {
      var point = element.children()[0].children[0];
      $rootScope.$on('dualshock:change', function (event, data) {
        if(data) {
          point.style.left = (data[attrs.control].x -1) + 'px';
          point.style.top = (data[attrs.control].y -1) + 'px';
        }
      });
    }
  };
});