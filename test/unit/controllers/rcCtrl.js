describe('/partials/rc/RcCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('RcCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});