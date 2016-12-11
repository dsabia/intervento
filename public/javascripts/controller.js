angular.module('interventoController', [])
  .controller('mainController', function($scope, $http, $document, $window, Intervento) {

    $scope.pagecontent='';
    $scope.pojo = null;
    $scope.list = null;
    $scope.title = '';

    $scope.listMaterials = function(){
      $http.get('/material/')
           .success(function(res) {
             $scope.title= 'Elenco materiali';
             $scope.list= res;
             $scope.pojo = null;
             changePagecontent($scope, '/material/page/view');
           }).error(function(res) {
             console.log("error in getAll");
           });
    };
    $scope.addMaterial = function(){
      $scope.pojo = {};
      $scope.title= 'Aggiungi materiale';
      changePagecontent($scope, '/material/page/form');
    };
    $scope.viewMaterial = function(code){
      console.log("code: " + code);
      $http.get('/material/' + code)
           .success(function(res, code) {
             $scope.title= 'Dettaglio materiale';
             $scope.pojo = res;
             $scope.list = null;
             changePagecontent($scope, '/material/page/view');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.editMaterial = function(code){
      $http.get('/material/' + code)
           .success(function(res, code) {
             $scope.pojo = res;
             $scope.title= 'Modifica materiale';
             changePagecontent($scope, '/material/page/form');
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.deleteMaterial = function(id){
      $http.delete('/material/' + id)
           .success(function(res) {
             $scope.listMaterials();
           }).error(function(res) {
             console.error("error in get");
           });
    };
    $scope.postMaterial = function(){
      $http.post('/material/', $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewMaterial(res.code);
           }).error(function(res) {
             console.error("error in posting");
           });
    };
    $scope.putMaterial = function(){
      $http.put('/material/'+$scope.pojo._id, $scope.pojo)
           .success(function(res) {
             $scope.pojo = null;
             $scope.viewMaterial(res.code);
           }).error(function(res) {
             console.error("error in posting");
           });
    };
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
