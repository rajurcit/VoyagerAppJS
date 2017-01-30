/// <reference path="CalculatorService.js" />

var myApp = angular.module('myApp', ['CalculatorService'], ['starter']);
myApp.controller('CalculatorController', function ($scope, Calculator, Dbinfo) {
    $scope.findSquare = function () {
        $scope.answer = Calculator.square($scope.number);
        $scope.add = Calculator.add($scope.number);
    }

});