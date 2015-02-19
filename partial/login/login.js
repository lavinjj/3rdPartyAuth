angular.module('3rdPartyAuth').controller('LoginCtrl',function($scope, facebookAuthenticate, googlePlusAuthentication){
    $scope.displayName = '';

    $scope.handleGooglePlusLogin = function(user){
        $scope.displayName = user.displayName + ' - GP:' + user.id;
    };

    $scope.loginWithGooglePlus = function(){
        $scope.displayName = '';
        googlePlusAuthentication.login().then($scope.handleGooglePlusLogin);
    };

    $scope.handleFacebookLogin = function(user){
        $scope.displayName = user.name + ' - FB:' + user.id;
    };

    $scope.loginWithFacebook = function(){
        $scope.displayName = '';
        facebookAuthenticate.login().then($scope.handleFacebookLogin);
    };

});
