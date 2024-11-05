const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { ProjectTask } = require("./model");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://ajaykantiboyina:Ajay%406203@cluster0.vleuyp5.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", () => {
    console.log("Database not connected");
});
db.once("open", () => {
    console.log("Connected Successfully");
});

app.post("/addproject", (req, res) => {
    const { id, projecttitle, task } = req.body;

    const newProjectTask = new ProjectTask({
        id: id,
        projecttitle: projecttitle,
        task: task.map((t) => ({
            taskName: t.taskName,
            startDate: t.startDate,
            deadlineDate: t.deadlineDate,
            status: t.status,
            id: t.id,
        })),
    });

    newProjectTask
        .save()
        .then((data) => res.status(201).send(data))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving project task");
        });
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
