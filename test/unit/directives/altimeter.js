describe('/directives/altimeter', function () {

  var $compile, $templateCache, outerScope, scope, element;

  beforeEach(function () {
    module('hk-aerial-gui');
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    $templateCache.put('directives/altimeter/altimeter.html', '<div></div>');
    element = $compile('<altimeter></altimeter>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  it('should have tests');
  
});