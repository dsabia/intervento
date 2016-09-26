angular.module('interventoController', [])
  .controller('mainController', function($scope, $http, $document, $window, Intervento) {

    $scope.addTecnico = function($window, $document){
      console.log('Some validation... - nome:'+$scope.form.nome + ' cognome:'+$scope.form.cognome );
      var tecnico = $scope.form;
      return Intervento.addTecnico(tecnico).success(function(data) {
          console.log('Success ' + $http);
			});
    }

    $scope.addScheda = function($window, $document){
      console.log('Some validation... - nome:');
      var cliente = $scope.form;
      return Intervento.addScheda(cliente).success(function(data) {
          console.log('Success ' + $http);
			});
    }
  });

function redirect($window, url){
  $window.location.href = url;
}
