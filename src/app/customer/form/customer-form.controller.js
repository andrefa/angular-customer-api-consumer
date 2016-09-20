(function(){

  'use strict';

  angular.module('customer.controllers.form', ['consumer.models.customer'])
         .controller('CustomerFormController', CustomerFormController);

  CustomerFormController.$inject = ['$state', '$stateParams', 'CustomerModel'];
  function CustomerFormController($state, $stateParams, CustomerModel) {

    var vm = this;

    vm.customer = {};
    vm.save = save;
    vm.remove = remove;
    vm.listCustomers = listCustomers;

    vm.$onInit = function() {
      var customerId = $stateParams.id;

      if (customerId) {
        CustomerModel.getCustomer(customerId)
          .then(customer => {
            if (customer)
              vm.customer = customer
            else
              $state.go('new');
          })
      }
    }

    function save() {
      if (vm.customer.id != null) {
        CustomerModel.updateCustomer(vm.customer)
          .then(listCustomers);
      } else {
        CustomerModel.saveCustomer(vm.customer)
          .then(listCustomers);
      }
    }

    function remove() {
      if(confirm('Are you sure?')) {
        CustomerModel.deleteCustomer(vm.customer)
          .then( () => {
            alert('Removed!');
            listCustomers();
          })
      }
    }

    function listCustomers(customer) {
      $state.go('list');
    }

  }

})();
