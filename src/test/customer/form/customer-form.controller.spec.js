(function() {

  'use strict';

  describe('CustomerFormController Unit Tests', function() {

    const CUSTOMER = {
      "id" : 1,
      "name" : "Andre",
      "email" : "email@domain.com",
      "phone" : "123456789",
      "address" : "1 street",
      "zipcode" : "123-456",
      "city" : "Gdynia",
      "state" : "Trojmiasto"
    };

    var $scope;
    var $q;
    var servicePromiseDeferred;
    var CustomerFormController;
    var $state;
    var $stateParams;
    var $httpBackend;

    beforeEach(module('consumer-app'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _$state_, _$stateParams_,_$httpBackend_, CustomerModel) {
      $q = _$q_;
      $scope = _$rootScope_;
      $state = _$state_;
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;

      servicePromiseDeferred = $q.defer();

      spyOn(CustomerModel, 'getCustomer').and.returnValue(servicePromiseDeferred.promise);

      CustomerFormController = $controller('CustomerFormController', {
        CustomerModel,
        $stateParams,
        $state
      });
    }));

    it('Should be in initial controller state', function() {
      expect(CustomerFormController.customer).toEqual({});
    });

  });

})();
