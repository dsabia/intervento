angular.module('interventoController', [])
  .controller('mainController', function($scope, $http, $document, $window, Intervento) {

    $scope.templates = [
      { name: 'home', url: 'angular/home'},
      { name: 'about', url: 'angular/about'}];
    $scope.template = $scope.templates[0];

    $scope.openAbout = function(){
      console.log("To open About");
      $scope.template = $scope.templates[1];
    };
    $scope.openHome = function(){
      console.log("To open Home");
      $scope.template = $scope.templates[0];
    };

    $scope.pagecontent='';
    $scope.pojo = null;
    $scope.list = null;
    $scope.title = '';

    $scope.listMaterials = function(){
      $http.get('/material/all')
           .success(function(res) {
             $scope.title= 'Elenco materiali';
             $scope.list= res;
             $scope.pojo = null;
             var page = '/material';
             changePagecontent($scope, page);
           }).error(function(res) {
             console.log("error in getAll");
           });
    };
    $scope.addMaterial = function(){
      $scope.pojo = {};
      var page = '/material/add';
      changePagecontent($scope, page);
    };
    $scope.viewMaterial = function(code){
      console.log("code: " + code);
      $http.get('/material/get/' + code)
           .success(function(res, code) {
             $scope.title= 'Dettaglio materiale';
             $scope.pojo = res;
             $scope.list = null;
             var page = '/material/' + code;
             changePagecontent($scope, page);
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.editMaterial = function(code){
      $http.get('/material/get/' + code)
           .success(function(res, code) {
             $scope.pojo = res;
             var page = '/material/edit/' + code;
             changePagecontent($scope, page);
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.deleteMaterial = function(_id){
      $http.get('/material/delete/' + _id)
           .success(function(res, code) {
             $scope.listMaterials();
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.postMaterial = function(){
      console.log($scope.pojo);
      console.log($scope.pojo.code);
      $http.post('/material/add', $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewMaterial(res.code);
           }).error(function(res) {
             console.error("error in posting");
           });
    };
  });

function changePagecontent($scope, page){
  if($scope.pagecontent === page){
    $scope.pagecontent='';
  }else{
    $scope.pagecontent=page;
  }
}
