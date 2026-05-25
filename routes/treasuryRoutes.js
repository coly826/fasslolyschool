const express = require("express");
const router = express.Router();
const Treasury = require("../models/Treasury");

// PAGE TREASURY
router.get("/", async (req, res) => {
    try {
        const treasury = await Treasury.find();
        res.render("treasury", {
            treasury: treasury || []   // ✅ IMPORTANT
        });
    } catch (err) {
        console.log(err);
        res.render("treasury", { treasury: [] });
    }
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