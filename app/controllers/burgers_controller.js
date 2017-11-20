var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burgers.js")


// Creating routes
// ----------------------------------------------------
// Index Redirect
router.get('/', function (req, res) {
    res.redirect('/index');
});


// Index Page (render all burgers to DOM)
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hsbObjects = {
            burgers: data
        };
        console.log(hsbObjects);
        res.render("index", hbsObject);
    });

});

// Create a New Burger
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new burger
        res.json({
            id: result.insertId
        });
    });
});

//Update if devoured
router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`
    console.log("condition", condition);

    burger.updateOne({
            devoured: req.body.devoured
        }), condition,
        function (result) {
            if (result.changedRows == 0) {
                //If no rows were changed, then the id must not exsist hence 404
                return res.status(404).end();
            } //end of if 
            else {
                res.status(200).end();
            } //end of else 
        } //end of annyomous function 
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } //end of if
        else {
            res.status(200).end();
        } //end of else
    }) //end of annyomus delete function 
});

module.exports = router;