var app = angular.module('app' , []);
app.controller("mainCtrl" , function($http,$scope)
{
    var currentId = 1;
    $scope.getPerson=function()
    {
      $http.get("/persons").then(function (res)
      {
          console.log(res);
        $scope.persons=res.data;
       
                
       })

    } 
    $scope.getPerson();
         

   
    $scope.addPerson=function()
    {
      $scope.person.id = currentId;
        $http.post('/persons/',$scope.person).then(function(res)
        {
             
            console.log(res);
            currentId++;
         
            $scope.getPerson();
            alert("kayıt basarılı");
           })
       };
    
    $scope.removePerson = function(id){
      console.log(id);
      $http.delete('/persons/'+ id).then(function (res){
        
         console.log(res);
         $scope.getPerson();
      
      })
  }

  
  $scope.updatePerson = function(id){
    console.log(id);
   
    $scope.person = $scope.persons.find(person => person._id === id);
    $http.put("/persons/"+$scope.person._id, $scope.person).then(function(response){
        $scope.getPerson();
        console.log(response);
    });
  }

})