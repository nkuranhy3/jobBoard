var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
   name: String,
   company: String,
   qualification: String,
   description: String,
   location: String,
   postedDate: {type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);