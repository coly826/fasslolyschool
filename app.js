const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const Member = require("./models/Member");

const treasuryRoutes = require("./routes/treasuryRoutes");
const presidentRoutes = require("./routes/presidentRoutes");

const app = express();

// ================= DB =================
mongoose.connect("mongodb+srv://blindecoly:coly826@aplicationxy.kaumhiu.mongodb.net/fassassos?retryWrites=true&w=majority&appName=aplicationxy")
.then(() => console.log("✅ MongoDB connecté"))
.catch(err => console.error("Erreur mongoose :", err));

// ================= CONFIG =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ================= MEMBERS =================
app.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.render("index", { members: members || [] });
    } catch (err) {
        console.log(err);
        res.render("index", { members: [] });
    }
});

app.post("/add", async (req, res) => {
    try {
        await Member.create(req.body);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// ================= MODULES ROUTES =================
app.use("/treasury", treasuryRoutes);
app.use("/president", presidentRoutes);

// ================= SERVER =================
app.listen(3000, () => {
    console.log("🚀 http://localhost:3000");
});