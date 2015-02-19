angular.module('3rdPartyAuth', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate']);

angular.module('3rdPartyAuth').config(function ($routeProvider) {

    $routeProvider.when('/login',{templateUrl: 'partial/login/login.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo: '/login'});

});

angular.module('3rdPartyAuth').run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('3rdPartyAuth').run(function (facebookAuthenticate) {
    facebookAuthenticate.setApiKey('Your App Id');
    facebookAuthenticate.init();
});

angular.module('3rdPartyAuth').run(function(googlePlusAuthentication){
    googlePlusAuthentication.configure({
        "clientId": "Your client Id",
        "scope": ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/tasks']
    });
});
