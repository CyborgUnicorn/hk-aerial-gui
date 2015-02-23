describe('/partials/dualShock/DualShockCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DualShockCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});