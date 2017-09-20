var dbManager = require("./DBManager.js");
var collectionName = "Employees";

function Employees() {
}

Employees.prototype.addEmpDetails = function (empDetails, callback) {
    console.log("empDetails", empDetails);
    dbManager.getConnection(function(db){
        db.collection(collectionName).insert(empDetails, function (err, result) {
            if (err)
                throw err;
            db.close();
            callback(result);
        });
    });
};
//get employee role
Employees.prototype.getEmployeeRole = function (request, response, callback) {
    // console.log("991 ", request.params);
    dbManager.getConnection(function (db) {
    db.collection(collectionName).find({
        empId: request.params.empId
    })
    .toArray(function (err, data) {
    if (err)
    throw err;
    
    db.close();
    callback(data);
    });
    });
    }
module.exports = {
    getInst: function () {
        return new Employees();
    }
}