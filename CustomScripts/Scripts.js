﻿var ROOTREF = "https://financeapp2.firebaseio.com";

var financeApp = angular.module('financeApp', ['ngRoute', 'firebase']);

// configure our routes
financeApp.config(function ($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'Pages/dashboard.html',
            controller: 'mainController'
        })
        .when('/AddNewEmployee', {
            templateUrl: 'Pages/Employee/AddNewEmployee.html',
            controller: 'AddNewEmployeeController'
        })
        .when('/ViewEmployee', {
            templateUrl: 'Pages/Employee/ViewEmployee.html',
            controller: 'ViewEmployeeController'
        })
        .when('/AddNewClient', {
            templateUrl: 'Pages/Client/AddNewClient.html',
            controller: 'AddNewClientController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});

financeApp.controller('mainController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
});

financeApp.controller('AddNewEmployeeController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
});

financeApp.controller('ViewEmployeeController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
});

financeApp.controller('AddNewClientController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Client').push($scope.Client);
        $scope.Client = null;
    }
});

