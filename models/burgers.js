// Import the ORM to create functions that will interact with the database.
var orm = require('../config/orm.js');

var burger = {
    selectAll: function (callback) {
        orm.selectAll("burgers", function (result) {
            callback(result); //callback
        });
    }, //end of select all

    insertOne: function (columns, values, callback) {
        orm.insertOne("burgers", columns, values, function (result) {
            callback(result); //callback
        });
    }, //end of create

    updateOne: function (objectColumnValues, condition, callback) {
        orm.updateOne("burgers", objectColumnValues, condition, function (result) {
            callback(result); //callback
        });
    }, //end of update

    delete: function (condition, callback) {
        orm.delete("burgers", condition, function (result) {
            callback(result);
        });
    }

}; //end of object

module.exports = burger;