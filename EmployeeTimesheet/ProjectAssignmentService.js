var collectionName = "ProjectAssignment";
var dbManager = require("./DBManager.js");

function ProjectAssignment() {}

//create project assignment details
ProjectAssignment.prototype.addProjectAssignmentDetails = function (projectAssignmentDetails, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName).insert(projectAssignmentDetails, function (err, result) {
            if (err)
                throw err;
            db.close();
            callback(result);
        });
    });
};

//get employee details
ProjectAssignment.prototype.getEmployeeDetails = function (request, response, callback) {
    // console.log("991 ", request.params);
    dbManager.getConnection(function (db) {
        db.collection(collectionName).find({
            projectManager: request.params.projectManager
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
        return new ProjectAssignment();
    }
}