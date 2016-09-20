(function() {

  'use strict';

  describe('CustomerModel Service Unit Tests', function() {

    const API_URL = 'http://tidy-api-test.herokuapp.com/api/v1/customer_data';
    const INVALID_CUSTOMER_ID = -1;
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

    beforeEach(module('consumer.models.customer'));

    var CustomerModel;
    var httpBackend;

    beforeEach(inject(function(_CustomerModel_, $httpBackend){
      CustomerModel = _CustomerModel_;
      httpBackend = $httpBackend;
    }));

    afterEach(function(){
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    /*
     * CustomerModel#getCustomers()
     */

    it('Should request customers json without results', function() {

      httpBackend.when('GET', API_URL + '.json').respond(JSON.stringify([]));
      CustomerModel.getCustomers().then(function(response) {
        expect(response.length).toBe(0);
      });
    });

    it('Should request customers json single result', function() {

      httpBackend.when('GET', API_URL + '.json').respond(JSON.stringify([CUSTOMER]));
      CustomerModel.getCustomers().then(function(response) {
        expect(response.length).toBe(1);
        expect(response[0]).toEqual(CUSTOMER);
      });
    });

    it('Should request customers json with multiple results', function() {

      httpBackend.when('GET', API_URL + '.json').respond(JSON.stringify([CUSTOMER, CUSTOMER]));
      CustomerModel.getCustomers().then(function(response) {
        expect(response.length).toBe(2);
        expect(response[0]).toEqual(CUSTOMER);
        expect(response[1]).toEqual(CUSTOMER);
      });
    });


    /*
     * CustomerModel#getCustomer(id)
     */

    it('Should request one customer by id without result', function() {

      httpBackend.when('GET', API_URL + '.json').respond(JSON.stringify([CUSTOMER]));
      CustomerModel.getCustomer(INVALID_CUSTOMER_ID).then(function(response) {
        expect(response).not.toBeDefined();
      });
    });

    it('Should request one customer by id successfully', function() {

      httpBackend.when('GET', API_URL + '.json').respond(JSON.stringify([CUSTOMER]));
      CustomerModel.getCustomer(CUSTOMER.id).then(function(response) {
        expect(response).toEqual(CUSTOMER);
      });
    });

    /*
     * CustomerModel#saveCustomer(customer)
     */

     it('Should post one customer to api', function() {
       httpBackend.expectPOST(API_URL).respond();
       CustomerModel.saveCustomer(CUSTOMER);
     });

     /*
      * CustomerModel#updateCustomer(customer)
      */

      it('Should update one customer on api', function() {
        httpBackend.expectPUT(API_URL + '/' + CUSTOMER.id).respond();
        CustomerModel.updateCustomer(CUSTOMER);
      });

      /*
       * CustomerModel#deleteCustomer(customer)
       */

       it('Should update one customer on api', function() {
         httpBackend.expectDELETE(API_URL + '/' + CUSTOMER.id).respond();
         CustomerModel.deleteCustomer(CUSTOMER);
       });

  });

})();
