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

financeApp.service('IdService', function () {
    this.getId = function (_Module) {
        var RetrivedId = 123;
        var IDs = {
            Employee: 50000,
            Client: 2000,
            Proposal: 500,
            Vendor: 800,
            Center: 1000,
            CRT: 1000
        };
        var ref = new Firebase(ROOTREF + "/IDs/" + _Module);

        ref.once("value", function (snapshot) {
            if (snapshot.val() == null) {
                ref.set(IDs[_Module]);
                RetrivedId = IDs[_Module];
            } else {
                RetrivedId = snapshot.val();
                console.log(snapshot.val());
            }
            }, function (errorObject) {
            RetrivedId = null;
            console.log("The read failed: " + errorObject.code);
        });
        return RetrivedId;

        // ID is printing is console but not returning to variable because of come Asymcs Call
        // Giving up this approch, will tyr to use run which will get all the IDs at once
    }
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

financeApp.controller('ViewEmployeeController', function ($scope, $firebaseObject, IdService) {
    var rootRef = new Firebase(ROOTREF);
    console.log("Start");
    console.log(IdService.getId("CRT"));
    console.log("End");
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
        rootRef.child('Center').push($scope.Center);
        $scope.Center = null;
    }
});

