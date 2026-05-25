const mongoose = require("mongoose");

const TreasurySchema = new mongoose.Schema({
    nom: String,
    montant: Number,
    mois: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Treasury", TreasurySchema);