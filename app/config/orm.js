var connection = require('../config/connection.js');


// function to print multiple string ?
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
};


function objectToSql(object1) {
  var arr = [];
  for (var key in object1) {
    var value = object1[key];
    if (Object.hasOwnProperty.call(object1, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
};


//orm
var orm = {
  selectAll: function (tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";"
    connection.query(queryString, function (error, result) {
      if (error) {
        throw error;
      }
      callback(result); //callback
    }); //end of query

  }, //end of all orm
  insertOne: function (table, columns, values, callback) {
    var queryString = `INSERT INTO ${table} (${columns.toString()}) VALUES (${printQuestionMarks(values.length)})`;

    console.log(queryString);
    connection.query(queryString, values, function (error, result) {
      if (error) {
        throw error;
      }
      callback(result); //callback
    });
  }, //end of add orm
  updateOne: function (table, objectColumnValues, condition, callback) {
    var queryString = "UPDATE " + table;
    var queryString = `UPDATE ${table} SET ${objectToSql(objectColumnValues)} WHERE ${condition}`;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result); //callback
    });
  }, //end of update


  delete: function (table, condition, callback) {
    var queryString = `DELETE FROM ${table} WHERE ${condition}`;
  
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  }
} //end of update orm

module.exports = orm;