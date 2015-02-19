angular.module('3rdPartyAuth').factory('facebookAuthenticate', function ($q) {
    var apiKey = '';
    var profile = {};
    var accessToken = '';
    var fbUserId = '';
    var deferred = null;

    var setApiKey = function (key) {
        apiKey = key;
    };

    var getApiKey = function () {
        return apiKey;
    };

    var getProfile = function () {
        return profile;
    };

    var getAccessToken = function () {
        return accessToken;
    };

    var getFacebookUserId = function () {
        return fbUserId;
    };

    var init = function () {
        FB.init({
            appId: apiKey,
            status: false, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: false,  // parse XFBML
            logging: true
        });

        FB.Event.subscribe('auth.authResponseChange', authResponseChangeHandler);
    };

    var authResponseChangeHandler = function (response) {
        // Here we specify what we do with the response anytime this event occurs.
        if (response.status === 'connected') {
            // The response object is returned with a status field that lets the app know the current
            // login status of the person. In this case, we're handling the situation where they
            // have logged in to the app.
            retrieveFBProfile();
        } else if (response.status === 'not_authorized') {
            // In this case, the person is logged into Facebook, but not into the app
            deferred.reject(response.status);
        } else {
            // In this case, the person is not logged into Facebook, so we call the login()
            // function to prompt them to do so. Note that at this stage there is no indication
            // of whether they are logged into the app. If they aren't then they'll see the Login
            // dialog right after they log in to Facebook.
            deferred.reject(response.status);
        }
    };

    var login = function () {
        FB.login();
        deferred = $q.defer();
        return deferred.promise;
    };

    var logout = function () {
        FB.logout();
    };

    var retrieveFBProfile = function () {
        FB.api('/me', function (response) {
            profile = response;
            deferred.resolve(profile);
        });
    };

    var facebookAuthenticate = {
        setApiKey: setApiKey,
        getApiKey: getApiKey,
        getProfile: getProfile,
        getAccessToken: getAccessToken,
        getFacebookUserId: getFacebookUserId,
        init: init,
        login: login,
        logout: logout,
        retrieveFBProfile: retrieveFBProfile
    };

    return facebookAuthenticate;
});
