var update = angular.module('update',[]);
var updateArray;
var dataChanged = false;

update.controller('updateController', function($scope) {
  for (attribute in $scope){
    $scope.attribute = '';
    updateArray.attribute = '';
  }
  $scope.updateData = function(){
      for(attribute in $scope){
        if ($scope.attribute !== ''){
          updateArray.attribute = $scope.attribute;
          dataChanged = true;
        }
      }
      if(dataChanged){
        fs.writeFile("./data/tmp2.json", userArray['email'], function(err){
          if(err){
            console.log("Temp file write error.")
          }
        })
      $http({method: 'PUSH', url: '/update'});  
      }
    }
});
