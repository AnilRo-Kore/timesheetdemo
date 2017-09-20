var collectionName = "Timesheet_Employee";
var dbManager = require("./DBManager.js");

function TimeSheet(){
}

TimeSheet.prototype.addTimesheetDetails = function(timesheetDetails, callback){
    dbManager.getConnection(function(db){
        db.collection(collectionName).insert(timesheetDetails, function (err, result) {
            if (err)
                throw err;
            db.close();
            callback(result);
        });
    });
};

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
            .updateOne(timesheetDetails, {upsert:true}, function (err, result) {
                if (err)
                    throw err;

                db.close();
                // console.log("request.body.ApprovalState", request.body.ApprovalState);
                callback(result);
            });
    });
}

module.exports = {
    getInst: function(){
        return new TimeSheet();
    }
}