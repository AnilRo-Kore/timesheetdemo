var collectionName = "ProjectDetails";
var dbManager = require("./DBManager.js");
var debug = require('debug')('ProjectDetailsService');

function ProjectDetails() {
}

//Adding project
ProjectDetails.prototype.addProjectDetails = function (projectDetails, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName).insert(projectDetails, function (err, result) {
            if (err)
                throw err;
            db.close();
            callback(result);
        });
    });
};

//get projects list by projectId
ProjectDetails.prototype.getProjectDetails = function (request, response, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName).find({
            projectId: request.params.projectId
        })
            .toArray(function (err, data) {
                if (err)
                    throw err;

                db.close();
                callback(data);
            });
    });
};

//get all projects
ProjectDetails.prototype.getAllProjects = function (request, response, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName).find()
            .toArray(function (err, data) {
                if (err)
                    throw err;

                db.close();
                callback(data);
            });
    });
};


module.exports = {
    getInst: function () {
        return new ProjectDetails();
    }
}