const express = require("express");
const router = express.Router();

const Member = require("../models/Member");
const PresidentTask = require("../models/PresidentTask");

// PAGE PRESIDENT (READ MONGODB)
router.get("/", async (req, res) => {
    try {
        const members = await Member.find({ role: "Président(e)" });
        const tasks = await PresidentTask.find().sort({ date: -1 });

        res.render("president", {
            members: members || [],
            tasks: tasks || []
        });

    } catch (error) {
        console.log("Erreur MongoDB:", error);

        res.render("president", {
            members: [],
            tasks: []
        });
    }
});

// AJOUT TASK
router.post("/add-task", async (req, res) => {
    try {
        await PresidentTask.create(req.body);
        res.redirect("/president");
    } catch (error) {
        console.log(error);
        res.redirect("/president");
    }
});

// DELETE TASK
router.get("/delete-task/:id", async (req, res) => {
    try {
        await PresidentTask.findByIdAndDelete(req.params.id);
        res.redirect("/president");
    } catch (error) {
        console.log(error);
        res.redirect("/president");
    }
});

module.exports = router;