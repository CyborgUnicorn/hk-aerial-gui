describe('/partials/drone/DroneCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DroneCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});