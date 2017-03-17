var app = angular.module('interventoController').controller('technicianController', function($scope, $http) {
  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';

  /* TECHNICIANS */
  $scope.listTechnicians = function(){
    $http.get('/api/technician/')
         .success(function(res) {
           $scope.title= res.title;
           $scope.list= res.list;
           $scope.pojo = null;
           changePagecontent($scope, '/fragment/technician/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addTechnician = function(){
    $http.get('/api/technician/formAdd')
         .success(function(res, code) {
           $scope.pojo = {};
           $scope.list = null;
           $scope.title= res.title;
           changePagecontent($scope, '/fragment/technician/form');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.viewTechnician = function(code){
    console.log("code: " + code);
    $http.get('/api/technician/' + code)
         .success(function(res, code) {
           $scope.title= res.title;
           $scope.pojo = res.pojo;
           $scope.list = null;
           changePagecontent($scope, '/fragment/technician/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editTechnician = function(code){
    $http.get('/api/technician/formEdit/' + code)
         .success(function(res, code) {
           $scope.pojo = res.pojo;
           $scope.title= res.title;
           changePagecontent($scope, '/fragment/technician/form');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.deleteTechnician = function(id){
    $http.delete('/api/technician/' + id)
         .success(function(res) {
           $scope.listTechnicians();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postTechnician = function(){
    $http.post('/api/technician/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewTechnician(res.account_code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putTechnician = function(){
    $http.put('/api/technician/'+$scope.pojo._id, $scope.pojo)
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
