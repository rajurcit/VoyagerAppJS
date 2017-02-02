
   // Wait for device API libraries to load
   //
   document.addEventListener("deviceready", onDeviceReady, false);
// Populate the database

function populateDB(tx) {
    //  tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (23, "Eleven row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (24, "towelve row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (25, "thirteen row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (26, "fourteen row")');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
        
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
    // for an insert statement, this property will return the ID of the last inserted row
    console.log("Last inserted row ID = " + results.insertId);
}

// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}
// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}

// device APIs are available
//
//
function onDeviceReady() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

 