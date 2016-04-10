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
        .when('/UpdateEmployee', {
            templateUrl: 'Pages/Employee/UpdateEmployee.html',
            controller: 'UpdateEmployeeController'
        })
        .when('/ViewEmployee', {
            templateUrl: 'Pages/Employee/ViewEmployee.html',
            controller: 'ViewEmployeeController'
        })
        .when('/AddNewClient', {
            templateUrl: 'Pages/Client/AddNewClient.html',
            controller: 'AddNewClientController'
        })
        .when('/UpdateClient', {
            templateUrl: 'Pages/Client/UpdateClient.html',
            controller: 'UpdateClientController'
        })
        .when('/NewLoanProposal', {
            templateUrl: 'Pages/LoanProposal/NewProposal.html',
            controller: 'NewLoanProposalController'
        })
        .when('/UpdateLoanProposal', {
            templateUrl: 'Pages/LoanProposal/UpdateProposal.html',
            controller: 'UpdateLoanProposalController'
        })
        .when('/NewVendor', {
            templateUrl: 'Pages/Vendor/NewVendor.html',
            controller: 'NewVendorController'
        })
        .when('/UpdateVendor', {
            templateUrl: 'Pages/Vendor/UpdateVendor.html',
            controller: 'UpdateVendorController'
        })
        .when('/NewCenter', {
            templateUrl: 'Pages/Center/NewCenter.html',
            controller: 'NewCenterController'
        })
        .when('/UpdateCenter', {
            templateUrl: 'Pages/Center/UpdateCenter.html',
            controller: 'UpdateCenterController'
        })
        .when('/NewCRT', {
            templateUrl: 'Pages/CRT/NewCRT.html',
            controller: 'NewCRTController'
        })
        .when('/UpdateCRT', {
            templateUrl: 'Pages/CRT/UpdateCRT.html',
            controller: 'UpdateCRTController'
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

financeApp.controller('AddNewEmployeeController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/Employee");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Employee.ID = snapshot.val();
                var key = rootRef.child('Employee').child(snapshot.val());
                key.set($scope.Employee);
                IdRef.set(parseInt($scope.Employee.ID) + 1);
                $scope.Employee = null;
                $timeout(function () {
                    $location.path('/UpdateEmployee').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateEmployeeController', function ($scope, $firebaseObject, $location) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("Employee/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.Employee = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.CRT);
        }
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

financeApp.controller('AddNewClientController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/Client");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Client.ID = snapshot.val();
                var key = rootRef.child('Client').child(snapshot.val());
                key.set($scope.Client);
                IdRef.set(parseInt($scope.Client.ID) + 1);
                $scope.Client = null;
                $timeout(function () {
                    $location.path('/UpdateClient').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateClientController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("Client/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.Client = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.Client);
        }
    }
});



financeApp.controller('NewVendorController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/Vendor");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Vendor.ID = snapshot.val();
                var key = rootRef.child('Vendor').child(snapshot.val());
                key.set($scope.Vendor);
                IdRef.set(parseInt($scope.Vendor.ID) + 1);
                $scope.Vendor = null;
                $timeout(function () {
                    $location.path('/UpdateVendor').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateVendorController', function ($scope, $firebaseObject, $location) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("Vendor/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.Vendor = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.Vendor);
        }
    }
});

financeApp.controller('NewCenterController', function ($scope, $firebaseObject,$location,$timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/Center");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Center.ID = snapshot.val();
                var key = rootRef.child('Center').child(snapshot.val());
                key.set($scope.Center);
                IdRef.set(parseInt($scope.Center.ID) + 1);
                $scope.Center = null;
                $timeout(function () {
                    $location.path('/UpdateCenter').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateCenterController', function ($scope, $firebaseObject,$location) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("Center/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.Center = data.val();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });    

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.Center);
        }
    }
});

financeApp.controller('NewCRTController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/CRT");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.CRT.ID = snapshot.val();
                var key = rootRef.child('CRT').child(snapshot.val());
                key.set($scope.CRT);
                IdRef.set(parseInt($scope.CRT.ID) + 1);
                $scope.CRT = null;
                $timeout(function () {
                    $location.path('/UpdateCRT').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateCRTController', function ($scope, $firebaseObject, $location) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("CRT/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.CRT = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.CRT);
        }
    }
});

financeApp.controller('NewLoanProposalController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/LoanProposal");
    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.LoanProposal.ID = snapshot.val();
                var key = rootRef.child('LoanProposal').child(snapshot.val());
                key.set($scope.LoanProposal);
                IdRef.set(parseInt($scope.LoanProposal.ID) + 1);
                $scope.LoanProposal = null;
                $timeout(function () {
                    $location.path('/UpdateLoanProposal').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
});

financeApp.controller('UpdateLoanProposalController', function ($scope, $firebaseObject, $location) {
    var rootRef = new Firebase(ROOTREF);
    var recordRef = rootRef.child("LoanProposal/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.LoanProposal = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.UpdateRec = function () {
        if (!formUpdate.$invalid) {
            recordRef.set($scope.CRT);
        }
    }
});

