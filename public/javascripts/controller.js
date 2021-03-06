var app = angular.module('interventoController', ['ngRoute', 'ui.bootstrap']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/homepage", {
        controller: "mainController"
    })
    .when("/technician_home", {
        controller: "technicianController"
    })
    .when("/technician", {
        controller: "technicianController"
    })
    .when("/customer_home", {
        controller: "customerController"
    })
    .when("/customer", {
        controller: "customerController"
    })
    .when("/intervention_home", {
        controller: "interventionController"
    })
    .when("/intervention", {
        controller: "interventionController"
    })
    .when("/work_folder_home", {
        controller: "workFolderController"
    })
    .when("/work_folder", {
        controller: "workFolderController"
    })
    ;
});

function changePagecontent($scope, page){
  $scope.pagecontent=page;
}
function togglePagecontent($scope, page){
  if($scope.pagecontent === page){
    $scope.pagecontent='';
  }else{
    $scope.pagecontent=page;
  }
}
