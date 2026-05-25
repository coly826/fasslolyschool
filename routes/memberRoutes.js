const express = require("express");
const router = express.Router();
const Treasury = require("../models/Treasury");

// PAGE TRESORIER
router.get("/", async (req, res) => {
    const data = await Treasury.find().sort({ createdAt: -1 });
    res.render("treasury", { treasury: data });
});

// AJOUT
router.post("/add", async (req, res) => {
    await Treasury.create(req.body);
    res.redirect("/treasury");
});

// DELETE
router.get("/delete/:id", async (req, res) => {
    await Treasury.findByIdAndDelete(req.params.id);
    res.redirect("/treasury");
});

module.exports = router;