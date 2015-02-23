describe('/partials/connect/ConnectCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ConnectCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});