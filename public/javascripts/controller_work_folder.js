var app = angular.module('interventoController').controller('workFolderController', function($scope, $http) {

  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';
  $scope.options_status = null;

  /* FOLDERS */
  $scope.listWorkFolders = function(){
    $http.get('/work_folder/')
         .success(function(res) {
           $scope.title= 'Elenco lavori';
           $scope.list= res;
           $scope.pojo = null;
           changePagecontent($scope, '/work_folder/page/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addWorkFolder = function(){
    $http.get('/work_folder/formAdd')
           .success(function(res, code) {
             $scope.pojo = {};
             $scope.list = null;
             $scope.title= res.title;
             $scope.options_status = res.options_status;
             $scope.pojo.date = new Date();
             changePagecontent($scope, '/work_folder/page/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.viewWorkFolder = function(code){
    console.log("code: " + code);
    $http.get('/work_folder/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio lavoro';
           $scope.pojo = res;
           $scope.list = null;
           changePagecontent($scope, '/work_folder/page/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editWorkFolder = function(code){
    $http.get('/work_folder/formEdit/' + code)
           .success(function(res, code) {
             $scope.pojo = res.pojo;
             $scope.title= res.title;
             $scope.options_status = res.options_status;
             $scope.pojo.status = $scope.findOptionStatus($scope.pojo);
             changePagecontent($scope, '/work_folder/page/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.deleteWorkFolder = function(id){
    $http.delete('/work_folder/' + id)
         .success(function(res) {
           $scope.listWorkFolders();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postWorkFolder = function(){
    $http.post('/work_folder/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewWorkFolder(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putWorkFolder = function(){
    $http.put('/work_folder/'+$scope.pojo._id, $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewWorkFolder(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };

  $scope.findOptionStatus = function(pojo){
    for(i = 0; i < $scope.options_status.length; i++){
      if($scope.options_status[i] == pojo.status){
        return $scope.options_status[i];
      }
    }
  };

  //$scope.customerSelected = undefined;
  //$scope.technicianSelected = undefined;
  $scope.getCustomers = function(query) {
    return $http.get('/typeahead/customers').then(function(response) {
      return response.data;
    });
  };
  $scope.getTechnicians = function(query) {
    return $http.get('/typeahead/technicians').then(function(resp) {
      return resp.data;
    });
  };

});
