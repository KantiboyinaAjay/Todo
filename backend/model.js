const mongoose = require('mongoose');

const SubTasks = new mongoose.Schema({
    taskName: {type: String},
    startDate: {type: String},
    deadlineDate: {type: String},
    status: {type: String},
    id: {type: String}
})
const ProjectTasks = new mongoose.Schema({
    id: { type : String},
    projecttitle: { type : String},
    task: [SubTasks]
});

const ProjectTask = mongoose.model('ProjectTask',ProjectTasks);
module.exports = {ProjectTask};