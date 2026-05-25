const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    notes: { type: String, default: "" }
});

module.exports = mongoose.model("Member", MemberSchema);