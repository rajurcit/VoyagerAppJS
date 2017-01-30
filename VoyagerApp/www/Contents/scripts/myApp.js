/// <reference path="CalculatorService.js" />

var myApp = angular.module('myApp', ['CalculatorService']);
myApp.controller('CalculatorController', function ($scope, Calculator) {
    $scope.findSquare = function () {
        $scope.answer = Calculator.square($scope.number);
        $scope.add = Calculator.add($scope.number);
    }
});