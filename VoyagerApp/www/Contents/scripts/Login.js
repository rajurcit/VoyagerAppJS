
scotchApp.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$compile', '$window',
  function ($scope, $rootScope, $http, $routeParams, $compile, $window) {
      var name = ""
      var password = "";
      //document.addEventListener("deviceready", onDeviceReady, false);
      
      $scope.Login = function (user) {
          name = user.name;
          password = user.password;         
      };
      $scope.Logout = function () {
          window.localStorage.setItem("userID", "");
      };
      $scope.goDelete = function (user) {
          name = user.name;
          password = user.password;
          var db = window.openDatabase("Database", "1.0", "VoyagerApp", 200000);
          db.transaction(deleteRow, errorCB);
      };

      function onDeviceReady() {
          var db = window.openDatabase("Database", "1.0", "VoyagerApp", 200000);
          db.transaction(populateDB, errorCB, successCB);
      }
      function populateDB(tx) {

          tx.executeSql('CREATE TABLE IF NOT EXISTS DEMODB (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');
      }
      function errorCB(err) {
          $scope.Errorlogin = "Mismatch userId or password";
          $scope.divloginUser = false;
          $scope.divloginData = false;
          $rootScope.divuser = false;
          $scope.lblmessage = true;
          //alert("Error processing SQL: " + err.code);
      }
      function successCB() {
          var db = window.openDatabase("Database", "1.0", "VoyagerApp", 200000);
          db.transaction(queryDB, errorCB);
      }
      function queryDB(tx) {
          tx.executeSql('SELECT * FROM DEMODB', [], querySuccess, errorCB);
      }
      function querySuccess(tx, results) {
          //for session
          // sessionStorage.setItem("userName", name);          
          var data = '';
          var len = results.rows.length;
          for (var i = 0; i < results.rows.length; i++) {
              data += '<p>' + results.rows[i].name + '</p>';
          }
          $scope.divloginData = true;
          $window.location.href = '#About';
          // document.getElementById("divtbl").innerHTML = data;        
          $rootScope.divuser = true;
          $scope.lblmessage = false;
          window.localStorage.setItem("userID", name);
          if (localStorage.getItem('userID')) {
              // $rootScope.loginUser = localStorage.getItem('userID');
              data = '<p>Welcome ' + localStorage.getItem('userID') + '!</p>';
              document.getElementById("divuserid").innerHTML = data;
              document.getElementById("divuser").style.visibility = "visible";
          }
          else {
              window.localStorage.setItem("userID", name);
              $rootScope.divuser = true;
          }
          //$cookieStore.put('userName', name);
          // $rootScope.loginUser= $cookieStore.get('userName')
          // $rootScope.loginUser = sessionStorage.getItem("userName");

      }
      function deleteRow(tx) {
          var data = tx.executeSql('select exists(SELECT 1 FROM DEMODB WHERE id = ' + password + ')', [], queryDB, errorCB);

      }

  }]);

