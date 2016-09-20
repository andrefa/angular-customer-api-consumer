(function() {
  'use strict';

  angular.module('consumer-app')
         .config(UiRouterConfig);

	UiRouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function UiRouterConfig($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/list');

	$stateProvider
		.state('list',{
		  url : '/list',
      controller : 'CustomerListController',
      controllerAs : 'customerListCtrl',
      templateUrl: 'app/customer/list/customer-list.tpl.html'
		})
    .state('new',{
		  url : '/new',
      controller : 'CustomerFormController',
      controllerAs : 'customerFormCtrl',
      templateUrl: 'app/customer/form/customer-form.tpl.html'
		})
    .state('edit',{
		  url : '/edit/:id',
      controller : 'CustomerFormController',
      controllerAs : 'customerFormCtrl',
      templateUrl: 'app/customer/form/customer-form.tpl.html'
		});
	}
})();
