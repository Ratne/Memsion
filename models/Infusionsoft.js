const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infusionSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("infusionsoft", infusionSchema);
