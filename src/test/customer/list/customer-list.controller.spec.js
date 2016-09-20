(function() {

  'use strict';

  describe('CustomerListController Unit Tests', function() {

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
    var CustomerListController;
    var $state;
    var $httpBackend;

    beforeEach(module('consumer-app'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _$state_, _$httpBackend_, CustomerModel) {
      $q = _$q_;
      $scope = _$rootScope_;
      $state = _$state_;
      $httpBackend = _$httpBackend_;

      servicePromiseDeferred = $q.defer();

      spyOn(CustomerModel, 'getCustomers').and.returnValue(servicePromiseDeferred.promise);

      CustomerListController = $controller('CustomerListController', {
        CustomerModel,
        $state
      });
    }));

    it('Should be in initial controller state', function() {
      expect(CustomerListController.customers.length).toBe(0);
    });

    it('Should request customers json', function() {
      CustomerListController.$onInit();

      $httpBackend.expectGET('app/customer/list/customer-list.tpl.html').respond();
      servicePromiseDeferred.resolve([CUSTOMER]);
      $scope.$apply();

      var customers = CustomerListController.customers;

      expect(customers.length).toBe(1);
      expect(customers[0]).toBe(CUSTOMER);
    });

  });

})();
