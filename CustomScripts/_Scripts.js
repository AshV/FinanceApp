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
            templateUrl: 'Pages/AddNewEmployee.html',
            controller: 'StaffController'
        })
        .when('/BankSignatory', {
            templateUrl: 'Pages/BankSignatory.html',
            controller: 'BankSignatoryController'
        })
        .when('/center', {
            templateUrl: 'Pages/center.html',
            controller: 'centerController'
        })
        .when('/Client', {
            templateUrl: 'Pages/Client.html',
            controller: 'ClientController'
        })
        .when('/client_transfar', {
            templateUrl: 'Pages/client_transfar.html',
            controller: 'client_transfarController'
        })
        .when('/Crt', {
            templateUrl: 'Pages/Crt.html',
            controller: 'CrtController'
        })
        .when('/LoanProposal', {
            templateUrl: 'Pages/LoanProposal.html',
            controller: 'LoanProposalController'
        })
        .when('/Staff', {
            templateUrl: 'Pages/staff.html',
            controller: 'StaffController'
        })
        .when('/Target', {
            templateUrl: 'Pages/Target.html',
            controller: 'TargetController'
        })
        .when('/Vendor', {
            templateUrl: 'Pages/Vendor.html',
            controller: 'VendorController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});

financeApp.controller('mainController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
  
});
financeApp.controller('BankSignatoryController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('BankSignatory').push($scope.BankSignatory);
        $scope.BankSignatory = null;
    }
});
financeApp.controller('centerController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('center').push($scope.center);
        $scope.center = null;
    }
});
financeApp.controller('ClientController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Client').push($scope.Client);
        $scope.Client = null;
    }
});
financeApp.controller('client_transfarController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('client_transfar').push($scope.client_transfar);
        $scope.client_transfar = null;
    }
});
financeApp.controller('CrtController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Crt').push($scope.Crt);
        $scope.Crt = null;
    }
});
financeApp.controller('LoanProposalController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.clientData = $firebaseArray(rootRef.child('Client'));
    $scope.staffData = $firebaseArray(rootRef.child('Staff'));
    $scope.centerData = $firebaseArray(rootRef.child('center'));

    $scope.AddRec = function () {
        rootRef.child('LoanProposal').push($scope.LoanProposal);
        $scope.LoanProposal = null;
    }
});

financeApp.controller('StaffController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Staff').push($scope.Staff);
        $scope.Staff = null;
    }
});

financeApp.controller('TargetController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddRec = function () {
        rootRef.child('Target').push($scope.Target);
        $scope.Target = null;
    }
});


financeApp.controller('VendorController', function ($scope, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.AddStaff = function () {
        rootRef.child('Vendor').push($scope.Vendor);
        $scope.Vendor = null;
    }
});
