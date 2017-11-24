// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-eaten").on("click", function (event) {
        var id = $(this).data("id");
        var eatenState = $(this).text().trim();
        if (eatenState === "Eat Again") {
            var newBurgerState = {
                devoured: false
            };
        } else {
            var newBurgerState = {
                devoured: true
            };
        }

        // Send the PUT request aka update burger information .
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function () {
                  // Reload the page to get the updated list
                location.reload();
               
            }
            );
    });//end of put



    $("#submit-button").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#new_burger").val().trim(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                // Reload the page and clear input box 
                location.reload();
                $("#new_burger").val("");
            }
            );
    });//end of post 

    $("#delete-button").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE",
        }).then(
            function () {
                
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });


});//end of function 