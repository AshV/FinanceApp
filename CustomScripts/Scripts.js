var ROOTREF = "https://financeapp2.firebaseio.com";

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
        .when('/NewLoanProposal', {
            templateUrl: 'Pages/LoanProposal/NewProposal.html',
            controller: 'NewLoanProposalController'
        })
        .when('/NewVendor', {
            templateUrl: 'Pages/Vendor/NewVendor.html',
            controller: 'NewVendorController'
        })
        .when('/NewCenter', {
            templateUrl: 'Pages/Center/NewCenter.html',
            controller: 'NewCenterController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});

financeApp.run(function ($rootScope) {
    var ref = new Firebase(ROOTREF + "/IDs/");
    ref.once("value", function (snapshot) {
        if (snapshot.val() == null) {
            ref.set({
                Employee: 50000,
                Client: 2000,
                Proposal: 500,
                Vendor: 800,
                Center: 1000,
                CRT: 1000
            });
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

financeApp.controller('mainController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
});

financeApp.controller('AddNewEmployeeController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Employee').push($scope.Employee);
        $scope.Employee = null;
    }
});

financeApp.controller('ViewEmployeeController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);

    rootRef.child("IDs/CRT").on("value", function (snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

financeApp.controller('AddNewClientController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Client').push($scope.Client);
        $scope.Client = null;
    }
});

financeApp.controller('NewLoanProposalController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('LoanProposal').push($scope.Proposal);
        $scope.Proposal = null;
    }
});

financeApp.controller('NewVendorController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Vendor').push($scope.Vendor);
        $scope.Vendor = null;
    }
});

financeApp.controller('NewCenterController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child("IDs/Center").once("value", function (snapshot) {
            $scope.Center.ID = snapshot.val();
            var key = rootRef.child('Center').child(snapshot.val());
            key.set($scope.Center);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        //rootRef.child('Center').push($scope.Center);
        //$scope.Center = null;
    }
});

