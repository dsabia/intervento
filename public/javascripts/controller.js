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
    $scope.listMaterials = function(){
      var page = '/material';
      changePagecontent($scope, page);
    };
    $scope.addMaterial = function(){
      var page = '/material/add';
      changePagecontent($scope, page);
    };
    $scope.viewMaterial = function(code){
      console.log("code: " + code);
      var page = '/material/' + code;
      changePagecontent($scope, page);
    };
    $scope.editMaterial = function(code){
      var page = '/material/edit/' + code;
      changePagecontent($scope, page);
    };
    $scope.deleteMaterial = function(_id){
      var page = '/material/delete/' + _id;
      changePagecontent($scope, page);
    };
    $scope.postMaterial = function(){
      $http.post('/material/add', $scope.formData)
           .success(function(data) {
             console.log("posted successfully");
           }).error(function(data) {
             console.error("error in posting");
           });
    };



// deprecated...
    $scope.addTecnico = function($window, $document){
      console.log('Some validation... - nome:'+$scope.form.nome + ' cognome:'+$scope.form.cognome );
      var tecnico = $scope.form;
      return Intervento.addTecnico(tecnico).success(function(data) {
          console.log('Success ' + $http);
			});
    };

    $scope.addScheda = function($window, $document){
      console.log('Some validation... - nome:');
      var cliente = $scope.form;
      return Intervento.addScheda(cliente).success(function(data) {
          console.log('Success ' + $http);
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

function redirect($window, url){
  $window.location.href = url;
}
