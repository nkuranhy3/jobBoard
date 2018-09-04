var express = require('express');
var router = express.Router();
var Job = require("../models/job");


router.get('/jobs', (req, res) => {
    Job.find({}, function (err, allJobs) {
        if (err) {
            console.log(err);
        } else {
            res.render("jobs", { jobs: allJobs });
        }
    });
});

//CREATE - add new job to DB
router.post("/jobs", function (req, res) {
    // get data from form and add to jobs array
    var name = req.body.name;
    var company = req.body.company;
    var description = req.body.description;
    var location = req.body.location;
    var qualification = req.body.qualification;


    var newjob = { name: name, company: company, description: description, location: location, qualification: qualification }
    // Create a new job and save to DB
    Job.create(newjob, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to jobs page
            res.redirect("/jobs");
        }
    });
});


//NEW - show form to create new job
router.get("/jobs/new", function (req, res) {
    res.render("new.ejs");
});


// SHOW - shows more info about one job
router.get("/jobs/:id", function (req, res) {
    //find the job with provided ID
    Job.findById(req.params.id, function (err, foundjob) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that job
            res.render("show.ejs", { job: foundjob });
        }
    });
})



module.exports = router;
