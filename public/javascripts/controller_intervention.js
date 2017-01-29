var app = angular.module('interventoController').controller('interventionController', function($scope, $http) {

  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';
  $scope.intervention_type_option = null;

  /* INTERVENTIONS */
  $scope.listInterventions = function(){
    $http.get('/intervention/')
         .success(function(res) {
           $scope.title= 'Elenco interventi';
           $scope.list= res;
           $scope.pojo = null;
           changePagecontent($scope, '/intervention/page/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addIntervention = function(){
    $http.get('/intervention/formAdd')
           .success(function(res, code) {
             $scope.pojo = {};
             $scope.list = null;
             $scope.title= res.title;
             $scope.intervention_type_option = res.intervention_type_option;
             $scope.pojo.date = new Date();
             changePagecontent($scope, '/intervention/page/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.viewIntervention = function(code){
    console.log("code: " + code);
    $http.get('/intervention/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio intervento';
           $scope.pojo = res;
           $scope.pojo.date = new Date($scope.pojo.date);
           $scope.list = null;
           changePagecontent($scope, '/intervention/page/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editIntervention = function(code){
    $http.get('/intervention/formEdit/' + code)
           .success(function(res, code) {
             $scope.pojo = res.pojo;
             $scope.title= res.title;
             $scope.intervention_type_option= res.intervention_type_option;
             $scope.pojo.type_of_intervention = $scope.findInterventionType($scope.pojo);
             $scope.pojo.date = new Date($scope.pojo.date);
             changePagecontent($scope, '/intervention/page/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.deleteIntervention = function(id){
    $http.delete('/intervention/' + id)
         .success(function(res) {
           $scope.listInterventions();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postIntervention = function(){
    $http.post('/intervention/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewIntervention(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putIntervention = function(){
    $http.put('/intervention/'+$scope.pojo._id, $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewIntervention(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };

  $scope.findInterventionType = function(pojo){
    for(i = 0; i < $scope.intervention_type_option.length; i++){
      if($scope.intervention_type_option[i] == pojo.type_of_intervention){
        return $scope.intervention_type_option[i];
      }
    }
  };


  // on load
  $scope.listInterventions();
});
