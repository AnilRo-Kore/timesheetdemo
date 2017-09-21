var collectionName = "Timesheet_Employee";
var dbManager = require("./DBManager.js");

function TimeSheet() {
}

TimeSheet.prototype.addTimesheetDetails = function (timesheetDetails, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName).insert(timesheetDetails, function (err, result) {
            if (err)
                throw err;
            db.close();
            callback(result);
        });
    });
};

//get timesheet for employee
TimeSheet.prototype.getProjectTimeSheetForProject = function (request, response, callback) {
    // console.log("991 ", request.params);
    dbManager.getConnection(function (db) {
        db.collection(collectionName).find({
            projectName: request.params.projectName
        })
            .toArray(function (err, data) {
                if (err)
                    throw err;

                db.close();
                callback(data);
            });
    });
}

//get timesheet details
TimeSheet.prototype.getTimeSheetDetails = function (request, response, callback) {
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


TimeSheet.prototype.updatedTimesheetDetails = function (timesheetDetails, callback) {
    dbManager.getConnection(function (db) {
        db.collection(collectionName)
            .update({ empId: timesheetDetails.empId }, { $set: { ApprovalState: timesheetDetails.ApprovalState } }, function (err, result) {
                if (err)
                    throw err;

                db.close();
                callback(result);
            });
    });
};


module.exports = {
    getInst: function () {
        return new TimeSheet();
    }
}