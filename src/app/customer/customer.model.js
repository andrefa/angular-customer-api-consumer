(function(){

  'use strict';

  angular.module('consumer.models.customer', [])
	       .service('CustomerModel', CustomerModel);

  CustomerModel.$inject = ['$http', '$q'];
  function CustomerModel($http, $q) {

    var model = this;
    var URL = 'http://tidy-api-test.herokuapp.com/api/v1/customer_data';

    model.getCustomers = getCustomers;
    model.getCustomer = getCustomer;
    model.saveCustomer = saveCustomer;
    model.updateCustomer = updateCustomer;
    model.deleteCustomer = deleteCustomer;

    function getCustomers() {
      return $http.get(URL + '.json')
                .then(extract);
    };

    function getCustomer(id) {
      return model.getCustomers()
        .then(
          customers => customers.find(customer => customer.id == id)
        );
    };

    function saveCustomer(customer) {
      return $http.post(URL, customer);
    };

    function updateCustomer(customer) {
      return $http.put(URL + '/' + customer.id, customer);
    };

    function deleteCustomer(customer) {
      return $http.delete(URL + '/' + customer.id);
    };

    function extract(result) {
      return result.data;
    }

  }

})();
