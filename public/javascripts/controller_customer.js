var app = angular.module('interventoController').controller('customerController', function($scope, $http) {
  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';

  /* CUSTOMERS */
  $scope.listCustomers = function(){
    $http.get('/api/customer/')
         .success(function(res) {
           $scope.title= 'Elenco clienti';
           $scope.list= res;
           $scope.pojo = null;
           changePagecontent($scope, '/page/customer/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addCustomer = function(){
    $scope.pojo = {};
    $scope.title= 'Aggiungi un nuovo cliente';
    changePagecontent($scope, '/page/customer/form');
  };
  $scope.viewCustomer = function(code){
    console.log("code: " + code);
    $http.get('/api/customer/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio del cliente';
           $scope.pojo = res;
           $scope.list = null;
           changePagecontent($scope, '/page/customer/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editCustomer = function(code){
    $http.get('/api/customer/' + code)
         .success(function(res, code) {
           $scope.pojo = res;
           $scope.title= 'Modifica il cliente';
           changePagecontent($scope, '/page/customer/form');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.deleteCustomer = function(id){
    $http.delete('/api/customer/' + id)
         .success(function(res) {
           $scope.listCustomers();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postCustomer = function(){
    $http.post('/api/customer/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewCustomer(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putCustomer = function(){
    $http.put('/api/customer/'+$scope.pojo._id, $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewCustomer(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };

  // on load
  $scope.listCustomers();
});
