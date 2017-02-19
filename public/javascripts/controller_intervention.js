var app = angular.module('interventoController').controller('interventionController', function($scope, $http) {

  $scope.pagecontent='';
  $scope.pojo = null;
  $scope.list = null;
  $scope.title = '';
  $scope.intervention_type_option = null;

  /* INTERVENTIONS */
  $scope.listInterventions = function(){
    $http.get('/api/intervention/')
         .success(function(res) {
           $scope.title= 'Elenco interventi';
           $scope.list= res;
           $scope.pojo = null;
           changePagecontent($scope, '/fragment/intervention/view');
         }).error(function(res) {
           console.log("error in getAll");
         });
  };
  $scope.addIntervention = function(){
    $http.get('/api/intervention/formAdd')
           .success(function(res, code) {
             $scope.pojo = {};
             $scope.list = null;
             $scope.title= res.title;
             $scope.intervention_type_option = res.intervention_type_option;
             $scope.pojo.date = new Date();
             $scope.pojo.start_time = new Date();
             $scope.pojo.end_time = new Date();
             changePagecontent($scope, '/fragment/intervention/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.viewIntervention = function(code){
    console.log("code: " + code);
    $http.get('/api/intervention/' + code)
         .success(function(res, code) {
           $scope.title= 'Dettaglio intervento';
           $scope.pojo = res;
           $scope.pojo.date = new Date($scope.pojo.date);
           $scope.pojo.start_time = new Date($scope.pojo.start_time);
           $scope.pojo.end_time = new Date($scope.pojo.end_time);
           $scope.list = null;
           changePagecontent($scope, '/fragment/intervention/view');
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.editIntervention = function(code){
    $http.get('/api/intervention/formEdit/' + code)
           .success(function(res, code) {
             $scope.pojo = res.pojo;
             $scope.title= res.title;
             $scope.intervention_type_option= res.intervention_type_option;
             $scope.pojo.type_of_intervention = $scope.findInterventionType($scope.pojo);
             $scope.pojo.date = new Date($scope.pojo.date);
             $scope.pojo.start_time = new Date($scope.pojo.start_time);
             $scope.pojo.end_time = new Date($scope.pojo.end_time);
             changePagecontent($scope, '/fragment/intervention/form');
           }).error(function(res) {
             console.error("error in get");
           });
  };
  $scope.deleteIntervention = function(id){
    $http.delete('/api/intervention/' + id)
         .success(function(res) {
           $scope.listInterventions();
         }).error(function(res) {
           console.error("error in get");
         });
  };
  $scope.postIntervention = function(){
    $http.post('/api/intervention/', $scope.pojo)
         .success(function(res) {
           $scope.pojo = null;
           $scope.viewIntervention(res.code);
         }).error(function(res) {
           console.error("error in posting");
         });
  };
  $scope.putIntervention = function(){
    $http.put('/api/intervention/'+$scope.pojo._id, $scope.pojo)
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


  // timepicker settings
  $scope.hstep = 1;
  $scope.mstep = 5;
  $scope.ismeridian = false;
  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  // on load
  $scope.listInterventions();
});
