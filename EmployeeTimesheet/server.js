var express = require("express");
// var mongodb = require("mongodb");
var bootstrap = require("./bootstrap.js");
var bodyParser = require('body-parser');
var moment = require('moment');
var debug = require('debug')('TimeSheet');
var EmployeeService = require("./EmployeeService.js").getInst();
var Timesheet = require("./TimeSheetService.js").getInst();
var ProjectDetails = require("./ProjectDetailsService.js").getInst();
var ProjectAssignmentDetails = require("./ProjectAssignmentService.js").getInst();

var middleware = function (request, response, next) {
    next();
};

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(middleware);
// var MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');
// var url = "mongodb://localhost:27017/TeamB";
//var url = "mongodb://heroku_6h7jg171:4fm7lbhd53aebelmkarpl7sm86@ds129144.mlab.com:29144/heroku_6h7jg171";

//Adding emp API
app.post('/timesheet/bot/addEmp', function (request, response) {
    debug("/timesheet/bot/addEmp", request.body);
    var filter = {};
    if (request.body.empId !== null && request.body.empId && request.body.empId !== '') {
        filter.empId = request.body.empId;
    }
    if (request.body.empName !== null && request.body.empName && request.body.empName !== '') {
        filter.empName = request.body.empName;
    }
    if (request.body.emailId !== null && request.body.emailId && request.body.emailId !== '') {
        filter.emailId = request.body.emailId;
    }
    if (request.body.role !== null && request.body.role && request.body.role !== '') {
        filter.role = request.body.role;
    }
    if (request.body.empManagerId !== null && request.body.empManagerId && request.body.empManagerId !== '') {
        filter.empManagerId = request.body.empManagerId;
    }
    if (request.body.empManagerName !== null && request.body.empManagerName && request.body.empManagerName !== '') {
        filter.empManagerName = request.body.empManagerName;
    }
    debug(filter);

    // var empDetailsInst = EmployeeService.getInst();
    EmployeeService.addEmpDetails(filter, function (result) {
        var addEmpDetails = {
            "data": {
                "success": true
            }
        }
        response.send(addEmpDetails);
    });

});

//Adding Project details API
app.post('/timesheet/bot/addProjectDetails', function (request, response) {
    debug("/timesheet/bot/addProjectDetails", request.body);
    var filter = {};
    if (request.body.projectId !== null && request.body.projectId && request.body.projectId !== '') {
        filter.projectId = request.body.projectId;
    }
    if (request.body.projectName !== null && request.body.projectName && request.body.projectName !== '') {
        filter.projectName = request.body.projectName;
    }
    if (request.body.projectManager !== null && request.body.projectManager && request.body.projectManager !== '') {
        filter.projectManager = request.body.projectManager;
    }
    if (request.body.projectHours !== null && request.body.projectHours && request.body.projectHours !== '') {
        filter.projectHours = request.body.projectHours;
    }

    // var projectDetailsInst = ProjectService.getInst();
    ProjectDetails.addProjectDetails(filter, function (result) {
        var addProjectDetails = {
            "data": {
                "success": true
            }
        };
        response.send(addProjectDetails);
    });
});

//Adding Employee timesheet details API
app.post('/timesheet/bot/addEmployeeTimesheetDetails', function (request, response) {
    debug("/timesheet/bot/addEmployeeTimesheetDetails", request.body);
    var filter = {};
    if (request.body.empId !== null && request.body.empId && request.body.empId !== '') {
        filter.empId = request.body.empId;
    }
    if (request.body.empName !== null && request.body.empName && request.body.empName !== '') {
        filter.empName = request.body.empName;
    }
    if (request.body.projectName !== null && request.body.projectName && request.body.projectName !== '') {
        filter.projectName = request.body.projectName;
    }
    if (request.body.DayDate !== null && request.body.DayDate && request.body.DayDate !== '') {
        filter.DayDate = request.body.DayDate;
    }
    if (request.body.ClockedHours !== null && request.body.ClockedHours && request.body.ClockedHours !== '') {
        filter.ClockedHours = request.body.ClockedHours;
    }
    if (request.body.ApprovalState !== null && request.body.ApprovalState && request.body.ApprovalState !== '') {
        filter.ApprovalState = request.body.ApprovalState;
    }
    if (request.body.projectManager !== null && request.body.projectManager && request.body.projectManager !== '') {
        filter.projectManager = request.body.projectManager;
    }
    debug(filter);
    // var timesheetInst = Timesheet.getInst();
    Timesheet.addTimesheetDetails(filter, function (result) {
        var addEmployeeTimesheetDetails = {
            "data": {
                "success": true
            }
        };
        response.send(addEmployeeTimesheetDetails);
    });
});

//Adding Project Assignment API
app.post('/timesheet/bot/addProjectAssignmentDetails', function (request, response) {
    debug("/timesheet/bot/addProjectAssignmentDetails", request.body);
    var filter = {};
    if (request.body.empId !== null && request.body.empId && request.body.empId !== '') {
        filter.empId = request.body.empId;
    }
    if (request.body.empName !== null && request.body.empName && request.body.empName !== '') {
        filter.empName = request.body.empName;
    }
    if (request.body.projectName !== null && request.body.projectName && request.body.projectName !== '') {
        filter.projectName = request.body.projectName;
    }
    if (request.body.assignedHours !== null && request.body.assignedHours && request.body.assignedHours !== '') {
        filter.assignedHours = request.body.assignedHours;
    }
    if (request.body.projectManager !== null && request.body.projectManager && request.body.projectManager !== '') {
        filter.projectManager = request.body.projectManager;
    }
    debug(filter);

    ProjectAssignmentDetails.addProjectAssignmentDetails(filter, function (result) {
        var addProjAssignmentDetails = {
            "data": {
                "success": true
            }
        };
        response.send(addProjAssignmentDetails);
    });
});

//Employee list by manager name
app.get('/timesheet/bot/projectManager/:projectManager', function (request, response) {
    // debug("/timesheet/bot/:projectManager", request.body);
    // debug("Connected correctly to server");
    // debug("12345678", request.params.projectManager);

    var callbackMethod = function (data) {
        response.send(data);
    };

    ProjectAssignmentDetails.getEmployeeDetails(request, response, callbackMethod);
});

//Get Employee timesheet
app.get('/timesheet/bot/getTimeSheet/:empId', function (request, response) {
    // debug("/timesheet/bot/:projectManager", request.body);
    // debug("Connected correctly to server");
    // debug("12345678", request.params.projectManager);

    var callbackMethod = function (data) {
        response.send(data);
    };

    Timesheet.getTimeSheetDetails(request, response, callbackMethod);
});


//Get Projects list by projectId
app.get('/timesheet/bot/projectId/:projectId', function (request, response) {
    // debug("/timesheet/bot/:projectManager", request.body);
    // debug("Connected correctly to server");
    // response.send(data);

    var callbackMethod = function (data) {
        response.send(data);
    };
    ProjectDetails.getProjectDetails(request, response, callbackMethod);
});

//Update employee timesheet by manager
app.put('/timesheet/bot/employee/:empId', function (request, response) {
    var filter = {};
    filter.empId = request.params.empId;
    // if (request.body.ApprovalState !== null && request.body.ApprovalState && request.body.ApprovalState !== '') {
    //     filter.ApprovalState = request.body.ApprovalState;
    // }
    Timesheet.updatedTimesheetDetails(filter, function (result) {
        var updateEmployeeTimesheetDetails = {
            "data": {
                success: true
            }
        };
        response.send(updateEmployeeTimesheetDetails);
    });

});

//Get Employee Role
app.get('/timesheet/bot/employee/:empId', function (request, response) {
    // debug("/timesheet/bot/:projectManager", request.body);
    // debug("Connected correctly to server");
    // response.send(data);

    var callbackMethod = function (data) {
        response.send(data);
    };
    EmployeeService.getEmployeeRole(request, response, callbackMethod);
});

//Get project timeSheet
app.get('/timesheet/bot/projectName/:projectName', function (request, response) {
    // debug("/timesheet/bot/:projectManager", request.body);
    // debug("Connected correctly to server");
    // response.send(data);

    var callbackMethod = function (data) {
        response.send(data);
    };
    Timesheet.getProjectTimeSheetForProject(request, response, callbackMethod);
});

//Get All Projects
app.get('/timesheet/bot/allProjects', function (request, response) {
    var callbackMethod = function (data) {
        response.send(data);
    };

    ProjectDetails.getAllProjects(request, response, callbackMethod);
});


var port = process.env.PORT || '5686';
app.set('port', port);
app.listen(port, function () {
    console.log('Example app listening on port !')
});
