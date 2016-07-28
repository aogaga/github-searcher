/**
 * Created by Raphson on 7/27/16.
 */
var appRoutes = angular.module('appRoutes',[]);
appRoutes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './views/home.client.view.html',
            controller: null,
            resolve: {
                loginRequired: loginRequired
            }
        })
        .when('/auth/login', {
            templateUrl: './views/login.client.view.html',
            controller: 'AuthController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .otherwise({ redirectTo: '/' });


    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/auth/login');
        }
        return deferred.promise;
    }

    //eliminate the hashbang
    $locationProvider.html5Mode(true);
}]);