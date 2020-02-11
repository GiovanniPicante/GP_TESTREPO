const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.use(bodyParser.json());

const ClientPath = path.join(__dirname, "../client");
const DependenciesPath = path.join(__dirname, "../node_modules");

app.use('/src', express.static(ClientPath));
app.use('/dep', express.static(DependenciesPath));

app.get('/', function(req, res) {
    res.sendFile(path.join(ClientPath, '/index.html'));
});

// TIME TABLE CONFIGUTATION ==================================================================================================
const timeTableConfig = require("../config/timetable.conf.json");

function getTimeTableForDay(day){
    var dayConfig = timeTableConfig.scheduling[day];

    for(var i = 0; i < dayConfig.length; i++){   
        dayConfig[i].lessonInfo = [];

        for(lesson in dayConfig[i].lessons){
            var lessonName = dayConfig[i].lessons[lesson];
            dayConfig[i].lessonInfo.push(timeTableConfig.lessons[lessonName]);
        }
    }

    return dayConfig;
}

function getAvailableDays(){
    let returnArray = [];
    
    for(let day in timeTableConfig.scheduling){
        returnArray.push(day);
    }

    return returnArray;
}

// EXAM DATES CONFIG =========================================================================================================
const examDatesConfig = require("../config/examdates.conf.json");
let examDates = {};

for(let month of examDatesConfig.scheduling){
    var monthObject = month;

    for(let i = 0; i < monthObject.exams.length; i++){
        let subjectShort = monthObject.exams[i].subject;
        monthObject.exams[i].subjectInfo = examDatesConfig.lessons[subjectShort]
    }

    examDates[monthObject.short] = monthObject;
}

// API =======================================================================================================================
app.get("/api/getDay", (request, response) => {
    let dayName = decodeURIComponent(request.query.day);
    response.send(getTimeTableForDay(dayName));
});

app.get("/api/availableDays", (request, response) => {
    let availableDays = getAvailableDays();
    response.send(availableDays);
});

app.get("/api/getExams", (request, response) => {
    response.send(examDates);
});

new Promise(resolve => {
    app.listen(8080, resolve);
}).then(() => {
    console.log("Server runs on port 8080");
    getTimeTableForDay("DI");
});