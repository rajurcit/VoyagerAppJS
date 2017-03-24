var AclApp = angular.module('AclApp', ['ngRoute', 'ngSanitize']);
AclApp.config(function ($routeProvider) {
    $routeProvider
        .when('/HoldingInfo/:id', {
            templateUrl: 'Templates/HoldingInfo.html',
            controller: 'holdingInfoCtrl'
        })
});
AclApp.controller('holdingInfoCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    if ($location.search().Holding) {
        var bibId = $location.search().Holding;
        GetHoldingInfo(bibId);
    }
    function GetHoldingInfo(bibId) {
        $http.get("http://64.94.37.21:7014/vxws/GetHoldingsService", {
            params: { 'bibId': bibId, 'link880sFlag': 'YYYY', 'dbCode': 'ZZZZ' }
        }).then(function (response) {
            debugger;
            var x2js = new X2JS();
            $scope.Data = x2js.xml_str2json(response.data);
            $scope.holdingsDetails = $scope.Data.voyagerServiceData.serviceData;
            if ($scope.holdingsDetails) {
                $scope.divhead = false;
                $scope.holdingsRecord = $scope.holdingsDetails.holdingsRecord;
                if ($scope.holdingsRecord) {
                    for (var i = 0; i < $scope.holdingsRecord.length; i++) {
                        if ($scope.holdingsRecord[0]) {
                            // var BasicHoldinginfo = $scope.holdingsRecord[0].bibRecord.marcRecord.datafield;
                            var HoldingInfo = $scope.holdingsRecord[0].mfhdCollection.mfhdRecord;
                            for (var j = 0; j < HoldingInfo.length; j++) {
                                $scope.itemLocationData = HoldingInfo[j].itemCollection.itemLocation.itemLocationData;
                                $scope.mfhdData = HoldingInfo[j].mfhdData;
                                for (var k = 0; k < $scope.itemLocationData.length; k++) {
                                    if ($scope.itemLocationData[k]._name == 'tempLocation') {
                                        var locationName = '<span>' + $scope.itemLocationData[k].__text + '</span><br>';
                                        $scope.locationName += locationName;
                                        $scope.locationName = $scope.locationName.replace('undefined', '');
                                    }
                                    if ($scope.itemLocationData[k]._name == 'databaseName') {
                                        var databaseName = '<span>' + $scope.itemLocationData[k].__text + '</span><br>';
                                        $scope.databaseName += databaseName;
                                        $scope.databaseName = $scope.databaseName.replace('undefined', '');
                                    }
                                    if ($scope.itemLocationData[k]._name == 'callNumber') {
                                        var callNumber = '<span>' + $scope.itemLocationData[k].__text + '</span><br>';
                                        $scope.callNumber += callNumber;
                                        $scope.callNumber = $scope.callNumber.replace('undefined', '');
                                    }
                                    if ($scope.itemLocationData[k]._name == 'updateLocation') {
                                        var updateLocation = '<span>' + $scope.itemLocationData[k].__text + '</span><br>';
                                        $scope.updateLocation += updateLocation;
                                        $scope.updateLocation = $scope.updateLocation.replace('undefined', '');
                                    }
                                }
                            }

                        } else { }

                    }
                }
            }
            else {
                $scope.diverror = false;
                $scope.ErrorMessage = $scope.holdingsDetails.voyagerServiceData.messages.message.__text;
            }
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
}]);