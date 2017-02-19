var app = angular.module('interventoController').controller('mainController', function($scope, $http) {

    $scope.pagecontent='';
    $scope.pojo = null;
    $scope.list = null;
    $scope.title = '';
    $scope.frazioni_dora_option = null;

    /* MATERIALS */
    $scope.listMaterials = function(){
      $http.get('/api/material/')
           .success(function(res) {
             $scope.title= 'Elenco materiali';
             $scope.list= res;
             $scope.pojo = null;
             changePagecontent($scope, '/page/material/view');
           }).error(function(res) {
             console.log("error in getAll");
           });
    };
    $scope.addMaterial = function(){
      $scope.pojo = {};
      $scope.title= 'Aggiungi materiale';
      changePagecontent($scope, '/page/material/form');
    };
    $scope.viewMaterial = function(code){
      console.log("code: " + code);
      $http.get('/api/material/' + code)
           .success(function(res, code) {
             $scope.title= 'Dettaglio materiale';
             $scope.pojo = res;
             $scope.list = null;
             changePagecontent($scope, '/page/material/view');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.editMaterial = function(code){
      $http.get('/api/material/' + code)
           .success(function(res, code) {
             $scope.pojo = res;
             $scope.title= 'Modifica materiale';
             changePagecontent($scope, '/page/material/form');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.deleteMaterial = function(id){
      $http.delete('/api/material/' + id)
           .success(function(res) {
             $scope.listMaterials();
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.postMaterial = function(){
      $http.post('/api/material/', $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewMaterial(res.code);
           }).error(function(res) {
             console.error("error in posting");
           });
    };
    $scope.putMaterial = function(){
      $http.put('/api/material/'+$scope.pojo._id, $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewMaterial(res.code);
           }).error(function(res) {
             console.error("error in posting");
           });
    };



    /* RATES*/
    $scope.addRate = function(){
      $http.get('/api/technician_rate/formData')
           .success(function(res, code) {
             $scope.pojo = {};
             $scope.title= res.title;
             $scope.frazioni_dora_option= res.frazioni_dora_option;
             changePagecontent($scope, '/page/technician_rate/form');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.viewRate = function(){
      $http.get('/api/technician_rate')
           .success(function(res, code) {
             $scope.title= res.title;
             $scope.pojo = res.pojo;
             $scope.list = null;
             changePagecontent($scope, '/page/technician_rate/view');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.editRate = function(code){
      $http.get('/api/technician_rate/formData')
           .success(function(res, code) {
             $scope.pojo = res.pojo;
             $scope.title= res.title;
             $scope.frazioni_dora_option = res.frazioni_dora_option;
             $scope.pojo.fraction_of_hour = $scope.findHourFraction($scope.pojo);
             changePagecontent($scope, '/page/technician_rate/form');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.postRate = function(){
      $http.post('/api/technician_rate/', $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewRate();
           }).error(function(res) {
             console.error("error in posting");
           });
    };
    $scope.putRate = function(){
      $http.put('/api/technician_rate/'+$scope.pojo._id, $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewRate();
           }).error(function(res) {
             console.error("error in posting");
           });
    };
    /* RATES UTILS */
    $scope.findHourFraction = function(pojo){
      for(i = 0; i < $scope.frazioni_dora_option.length; i++){
        if($scope.frazioni_dora_option[i] == pojo.fraction_of_hour){
          return $scope.frazioni_dora_option[i];
        }
      }
    };
});
