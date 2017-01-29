var app = angular.module('interventoController').controller('technicianController', function($scope, $http) {
  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';

  /* TECHNICIANS */
  $scope.listTechnicians = function(){
    $http.get('/technician/')
         .success(function(res) {
           $scope.title= 'Elenco tecnici';
           $scope.list= res;
           $scope.pojo = null;
           changePagecontent($scope, '/technician/page/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addTechnician = function(){
    $scope.pojo = {};
    $scope.title= 'Aggiungi un tecncio';
    changePagecontent($scope, '/technician/page/form');
  };
  $scope.viewTechnician = function(code){
    console.log("code: " + code);
    $http.get('/technician/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio del tecnico';
           $scope.pojo = res;
           $scope.list = null;
           changePagecontent($scope, '/technician/page/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editTechnician = function(code){
    $http.get('/technician/' + code)
         .success(function(res, code) {
           $scope.pojo = res;
           $scope.title= 'Modifica il tecnico';
           changePagecontent($scope, '/technician/page/form');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.deleteTechnician = function(id){
    $http.delete('/technician/' + id)
         .success(function(res) {
           $scope.listTechnicians();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postTechnician = function(){
    $http.post('/technician/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewTechnician(res.account_code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putTechnician = function(){
    $http.put('/technician/'+$scope.pojo._id, $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewTechnician(res.account_code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };


  // on load
  $scope.listTechnicians();
});
