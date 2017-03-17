var app = angular.module('interventoController').controller('workFolderController', function($scope, $http) {

  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';

  /* FOLDERS */
  $scope.listWorkFolders = function(){
    $http.get('/api/work_folder/')
         .success(function(res) {
           $scope.title= res.title;
           $scope.list= res.list;
           $scope.pojo = null;
           changePagecontent($scope, '/fragment/work_folder/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addWorkFolder = function(){
    $http.get('/api/work_folder/formAdd')
           .success(function(res, code) {
             $scope.pojo = {};
             $scope.pojo.date = new Date();
             $scope.pojo.customer = {};
             $scope.pojo.technician = {};
             $scope.list = null;
             $scope.title= res.title;
             changePagecontent($scope, '/fragment/work_folder/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.viewWorkFolder = function(code){
    console.log("code: " + code);
    $http.get('/api/work_folder/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio lavoro';
           $scope.pojo = res;
           $scope.list = null;
           changePagecontent($scope, '/fragment/work_folder/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editWorkFolder = function(code){
    $http.get('/api/work_folder/formEdit/' + code)
           .success(function(res, code) {
             $scope.pojo = res.pojo;
             $scope.title= res.title;
             changePagecontent($scope, '/fragment/work_folder/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.deleteWorkFolder = function(id){
    $http.delete('/api/work_folder/' + id)
         .success(function(res) {
           $scope.listWorkFolders();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postWorkFolder = function(){
    $http.post('/api/work_folder/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewWorkFolder(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putWorkFolder = function(){
    $http.put('/api/work_folder/'+$scope.pojo._id, $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewWorkFolder(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };

  // typeahead
  $scope.getCustomers = function(query) {
    var url = '/api/typeahead/customers' + (query == null ? '' : '/'+query);
    return $http.get(url).then(function(response) {
      return response.data;
    });
  };
  $scope.getTechnicians = function(query) {
    var url = '/api/typeahead/technicians' + (query == null ? '' : '/'+query);
    return $http.get(url).then(function(resp) {
      return resp.data;
    });
  };

  // onload
  $scope.listWorkFolders();
});
