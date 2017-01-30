var CalculatorService = angular.module('CalculatorService', [])
    
.service('Calculator', function () {
    this.square = function (a)
    {
        return a * a
    };

    this.add = function (a) {
        return a + a
    };
    this.root = function (a) {
        return a * a*a
    };
})

.factory('CarFactory', function () {
    return function (numCylinder) {
        this.dealer = "Bad";
        this.numCylinder = numCylinder
    };
});