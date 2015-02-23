describe('/partials/debug/DebugCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DebugCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});