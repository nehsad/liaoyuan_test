var myapp = angular.module("myapp", []);

myapp.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/lts/:shortURL', {

            templateUrl:"test.html",
            controller:"ViewCtrl"

        })

});

myapp.controller("AppCtrl", function($http, $scope){

    $scope.longToShortConvert = function(longURL){

        if(ValidURL(longURL)) {
            $http.get("/fingLongURL", {params: {longURL: longURL}}).then(function (findItems) {

                if (findItems.data.length != 0) {

                    $scope.shortURL = "http://ltos.mybluemix.net/#/lts/" + findItems.data[0].shortURL;

                } else {

                    $http.get("/addURL", {params: {longURL: longURL}}).then(function (addItem) {

                        $scope.shortURL = "http://ltos.mybluemix.net/#/lts/" + addItem.data.shortURL;

                    });
                }
            });
        }
    };
});

myapp.controller("ViewCtrl", function($scope, $http, $routeParams, $location){

    var shortURL = $routeParams.shortURL;
    console.log("shortURL");

    $http.get("/shortToLong/" + shortURL).success(function(findItems) {

        if(findItems.length != 0) {

            window.location = findItems[0].longURL;

        } else {

            $location.path("/");

        }
    });
});

function ValidURL(str) {
    var myRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    if (!myRegExp.test(str)){
        alert("Please Input an Valid URL!");
        return false;
    }else{
        return true;
    }
}