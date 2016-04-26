var ROOTREF = "https://financeapp2.firebaseio.com";

var financeApp = angular.module('financeApp', ['ngRoute', 'firebase']);

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
        .when('/ViewClient', {
            templateUrl: 'Pages/Client/ViewClient.html',
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
        .when('/ViewCenter', {
            templateUrl: 'Pages/Center/ViewCenter.html',
            controller: 'ViewCenterController'
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
    ref.child("Center").on("value", function (data) {
        $rootScope.Centers = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

financeApp.controller('mainController', function ($scope, $firebaseObject) {
    var rootRef = new Firebase(ROOTREF);
    $scope.$on('$viewContentLoaded', function () {

    });
});

financeApp.controller('AddNewEmployeeController', function ($scope, $firebaseObject, $location, $timeout) {
    var rootRef = new Firebase(ROOTREF);
    var IdRef = rootRef.child("IDs/Employee");
    var CenterDdlRef = rootRef.child("Center");

    //CenterDdlRef.on("value", function (data) {
    //   $scope.Centers = data.val();
    //}, function (errorObject) {
    //    console.log("The read failed: " + errorObject.code);
    //});

    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Employee.ID = snapshot.val();
                // Pushing Form Data
                var key = rootRef.child('Employee').child(snapshot.val());
                key.set($scope.Employee);

                // Pushing Encoded Image
                var Imgkey = rootRef.child('EmployeePics').child(snapshot.val());
                if ($scope.EmployeePic != null)
                    Imgkey.set($scope.EmployeePic);

                IdRef.set(parseInt($scope.Employee.ID) + 1);
                $timeout(function () {
                    $location.path('/UpdateEmployee').search({ ID: snapshot.val() });
                }, 0);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }

    $scope.GetFile = function (f) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var binaryData = e.target.result;
                    $scope.EmployeePic = window.btoa(binaryData);
                    document.getElementById('base64').src = "data:image/png;base64, " + $scope.EmployeePic;
                };
            })(f);
            reader.readAsBinaryString(f);
           }
});

financeApp.controller('UpdateEmployeeController', function ($scope, $firebaseObject, $location) {
    var rootRef = new Firebase(ROOTREF);
    var CenterDdlRef = rootRef.child("Center");

    CenterDdlRef.on("value", function (data) {
        $scope.Centers = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    var recordRef = rootRef.child("Employee/" + $location.search().ID);
    recordRef.on("value", function (data) {
        $scope.Employee = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    var imageRef = rootRef.child("EmployeePics/" + $location.search().ID);
    imageRef.on("value", function (data) {
        $scope.EmployeePic = data.val();
        if ($scope.EmployeePic != null)
            document.getElementById('base64').src = "data:image/png;base64, " + $scope.EmployeePic;
        else
            document.getElementById('base64').src = "data:image/png;base64, " + "/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAlgCWAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/VKiiigAooooAMYoxRRQAUYxRQKACkxS0YoAMUUUUAGKMUYooAKMUUUAGKKKKADFFFFABRRRQAUUYpKAFooooAKM1ieLvF+leCNFm1TWLpLS0j7sfmduyqO5PpXyH8S/2qfEXim4ltvD7toOmAkK8Z/0iQepb+H6D86APsXVvEmlaEu7UdStLEetzOsefzNYVv8AF7wTdTLFF4r0hpGOAv2tBn9a/Oy7vbi/nee6nkuJn5aSVyzE/U1DQB+oFjqFrqcCzWlzDdQt0kgkDqfxFWM1+ZWg+J9W8L3i3Wkajc6dcD+O3kK5+o6H8a+j/hJ+1m8k0Gl+M1X5iETVIl24PT94o4/EflQB9TUVFa3MV5bxzwyLLDIoZHRsqwPIIPepaACiik70ALRRRQAUUCigAFFFFABRRQaADNV9Rv7fS7G4u7qVYLeCNpJJHOAqgZJqxXhH7XnjCTQfANvpNu5SfVpvLfaefKXlvzO0fnQB83/Gf4r3vxS8UyXDSPHpNsxjsrbPCrn7xH949z9K8+ozzRQAUUUUAHSg80UUAfRv7Lfxqm0vU4PCGsz77C4O2xlkP+pkPOzPo3b3+tfXQOea/Ly3uJLO4jnhcxyxMHR1OCrDkEV+jvwz8VL418B6LrOR5lzbqZRnpIOH/UGgDp6DRR2oAKKKKADpRRRQAfjRQKKACjHvRRQAV8i/trXEjeK/DsBYmJbJ3C+hMhBP/jo/Kvrqvlb9tjRHF14a1dVYoUltXbPAIIZf5t+VAHzBRRRQAYo7UYoNABjNGKKKAAV9wfsk3Ulx8IYEkbKw3s8aDHRchsfmxr4fNfeP7MWhtovwf0gurK940l2Qc9GbA/QCgD1eiig0AFFBooAKKKKACiiigAoopPyoAWuC+Nvw/wD+Fj/D+/0yIf6agFxat/00XkD8RkfjXe0hHFAH5eTwSWs8kMyNHLGxR0cYKkcEEetR19Z/tGfs8Ta7PP4p8M2++9IL3tjGADLj/lonq3qO/wBa+TpI3hkaORWSRTtZWGCCOoNADaKKKACijNafhvw1qXi3V4NN0m0kvLyZgqog4HuT2HuaANH4deC7r4g+MNO0S1Vv38gMrgcRxDl2P0H64r9GtK0+HSNNtbG2Ty7e2iWGNfRVGB/KvOPgX8F7f4U6GWnKXOu3YBurlRwg7Rqf7o/U16jQAUE0UUAFFIaWgAopMUUALQKKKACg80UUAGaRnCKSSAAMkmsPxj410nwJosuqaxdra2qcDPLO3ZVHUmvjH4s/tG698Q5prSxkfSNDPyi3ibEko/22H8hxQB9PeKP2ivA/hXVY9PuNVFzMW2yGzQypF/vMOPwGTWb4n+FXw/8Ajhaf2naTwNdOONQ02Rd5/wB9eh/EZr4W/nV3Sta1DQ7gT6dfXFjMDnfbyFD+lAHu/iL9jXxHZl30fVLLUo8/LHNmF8fqP17Vz/8AwyZ8QSRm0sQPX7YtZelftLfEPSgoGum6RQRi6hSTP1OM/rWmf2sviGf+Xyy/8A0oA7jwv+xhctMkniHXY0iHLQWCEsfbe3T8q9YS5+HX7PmkPEkttp8pXLKG827m+v8AEensK+S9b+PXj3xBE0V14jukiYEFLcLCCD2+UCuEuLmW7maWeV5pW6vIxZj9SaAP0Q8CfF3wv8Q4v+JRqcb3GMtaTfJKv/AT1/CuzBr8vbW7msrhJ7eV4JkO5JI2Ksp9QRX0p8Gf2qp7WW30fxlIZoWOyPVONyZ6eZ6j360AfV9BqG0u4b62int5UnglUOkkZ3KwPQgjrUxNACUtFGaAEopaKACiigUAFY3i7xVp/gvw/eavqcwhtLZNx55Y9lHqSeBWya+J/wBqL4qv4w8WNoNjMTpOlOY22niWb+I8dQOg+hoA4T4q/FPVfin4ge9vXMNnGSLWzVvkiX+pPc1xXSiigAooooAKKKDQAUUd6KADrRRRQB7t+zl8dpvBepweHtanaTQbl9kMjnJtXJ4x/snuO3Wvs+ORZEVlIZWGQQcgivy6r7K/ZU+Kr+KfD7+HNRl36jpiAwux5lg6Ae5Xp9MUAe/GikzxS0AJiilooAKKKM0AcP8AGjxsfAPw61bVY3CXXl+Tbf8AXV+F/Lk/hX54yO0sjO7FnYlmY9Se5r9Cfjf8PpfiV8Pr7SLZ1S+VluLYucKZFzgH6gkfjXwZq/g/XNBvpLPUNJvLW5jJDRvC3rjIOMEcdRxQBj0Zq3/ZF/8A8+Nx/wB+W/wo/se//wCfG5/78t/hQBU60Vb/ALHv/wDnyuf+/Lf4Uf2Rf/8APlc/9+W/woAqUVb/ALHv/wDnyuf+/Lf4Uf2Rf/8APlc/9+W/woAqYoq5/ZF//wA+Vz/35b/Ck/se/wD+fK5/78t/hQBUoxVv+yL/AP58rn/vy3+FL/ZF/wD8+Vz/AN+W/wAKAKddR8MvGMvgPxzpOtRsQkEwEwHO6JuHH5E1hf2Pf/8APlc/9+W/wrsPht8IPEHxD123tYLC4t7DePtF7LGVjjTPPJHJx2oA/QmCVZ4I5EO5HUMp9QelSVBY2qWFlb20Q2xQxrGgA6ADA/lU9ABiikooAWijvRQAGkwB0paKAEpcCiigBKMUHrS9qADig0CigBMUvFFFAAfpSYpTRQAcUhA9OaWg0AGMUUlL3oAKKOtFAAKKKKACjqKKKAA0UUUAGKKKKACiiigAo9KKKACiiigBKO1FFAC4ooooAKKKKAP/2Q==";
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
    var CenterDdlRef = rootRef.child("Center");
    var EmployeeDdlRef = rootRef.child("Employee");

    CenterDdlRef.on("value", function (data) {
        $scope.Centers = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    EmployeeDdlRef.on("value", function (data) {
        $scope.Employees = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $scope.AddRec = function () {
        if (!formAdd.$invalid) {
            IdRef.once("value", function (snapshot) {
                $scope.Client.ID = snapshot.val();
                var key = rootRef.child('Client').child(snapshot.val());
                key.set($scope.Client);

                // Pushing Encoded Image
                var Imgkey = rootRef.child('ClientPics').child(snapshot.val());
                if ($scope.ClientPic != null)
                    Imgkey.set($scope.ClientPic);

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

    $scope.GetFile = function (f) {
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                $scope.ClientPic = window.btoa(binaryData);
                document.getElementById('base64').src = "data:image/png;base64, " + $scope.ClientPic;
            };
        })(f);
        reader.readAsBinaryString(f);
    }

});

financeApp.controller('UpdateClientController', function ($scope, $firebaseObject,$location) {
    var rootRef = new Firebase(ROOTREF);
    var CenterDdlRef = rootRef.child("Center");
    var EmployeeDdlRef = rootRef.child("Employee");

    CenterDdlRef.on("value", function (data) {
        $scope.Centers = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); var CenterDdlRef = rootRef.child("Center");

    EmployeeDdlRef.on("value", function (data) {
        $scope.Employees = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    var recordRef = rootRef.child("Client/" + $location.search().ID);
    recordRef.on("value", function (data) {
        console.log(data.val());
        $scope.Client = data.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    var imageRef = rootRef.child("ClientPics/" + $location.search().ID);
    imageRef.on("value", function (data) {
        $scope.ClientPic = data.val();
        if ($scope.ClientPic != null)
            document.getElementById('base64').src = "data:image/png;base64, " + $scope.ClientPic;
        else
            document.getElementById('base64').src = "data:image/png;base64, " + "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";
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

financeApp.controller('NewCenterController', function ($scope, $firebaseObject, $location, $timeout) {
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

financeApp.controller('UpdateCenterController', function ($scope, $firebaseObject, $location) {
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

financeApp.controller('ViewCenterController', function ($scope, $firebaseObject, $firebaseArray) {
    var rootRef = new Firebase(ROOTREF);
    $scope.CenterList = $firebaseArray(rootRef.child("Center"));
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

function a() {
alert("External");
}