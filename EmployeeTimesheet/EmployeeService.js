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

module.exports = {
    getInst: function () {
        return new Employees();
    }
}