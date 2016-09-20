(function(){

  'use strict';

  angular.module('customer.controllers.list', ['consumer.models.customer'])
         .controller('CustomerListController', CustomerListController);

  CustomerListController.$inject = ['$state', 'CustomerModel'];
  function CustomerListController($state, CustomerModel) {

    var vm = this;

    vm.customers = [];
    vm.create = create;
    vm.edit = edit;
    vm.remove = remove;

    vm.$onInit = function() {
      listCustomers();
    }

    function create() {
      $state.go('new');
    }

    function edit(customer) {
      $state.go('edit', {id : customer.id});
    }

    function remove(customer) {
      if(confirm('Are you sure?')) {
        CustomerModel.deleteCustomer(customer)
          .then( () => {
            alert('Removed!');
            listCustomers();
          });
      }
    }

    function listCustomers(){
      CustomerModel.getCustomers()
        .then( customers => vm.customers = customers );
    }

  }

})();
