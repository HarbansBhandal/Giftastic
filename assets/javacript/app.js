function sportsClass(){
     this.sports = ["boxing", "diving", "football", "hockey", "lacrosse", "nascar", "skateboarding"];

     this.renderButtons = function () {
          // Deleting the sports buttons-view  prior to adding new sports
             // (this is necessary otherwise you will have repeat buttons)
             $("#buttons-view").empty();
             //Looping thru the array of sports
             for (var i = 0; i < this.sports.length; i++){
                  // Then dynamicaly generating buttons for each sport in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                  var sportBtn = $("<button>");
                  // Adding a class of movie to our button
                  sportBtn.addClass("sport");
                   // Adding a data-attribute
                  sportBtn.attr("data-name", this.sports[i]);
                  // Providing the initial button text
                  sportBtn.text(this.sports[i].toUpperCase());
                  // Adding the button to the buttons-view div
                  $("#buttons-view").append(sportBtn);
             }
        };
}

var sport_class = new sportsClass();

//function re-renders the HTML to display the appropriate content
function displaySportInfo() {
     //variable to hold sports data
     var sport = $(this).attr("data-name");

     var api = "http://api.giphy.com/v1/gifs/search?";
     var apiKey = "&api_key=dc6zaTOxFJmzC";
     var apiLimit = "&limit=10";
     var query = "q=" + sport;
     var queryURL = api + query + apiKey + apiLimit;

     // Creating an AJAX call for the specific movie button being clicked
     $.ajax({
          url: queryURL,
          method: "GET"
     }).done(function(response) {
          //console.log(response.data[0].rating);
          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++){
               // Creating a sportDiv
               var sportDiv = $("<div class='sport'>");
               //Variable to storing the rating data
               var rating = results[i].rating;
               //Creatomg a ratingDiv
               var ratingDiv = $("<p class='ratingDiv'>");
               ratingDiv.text("Rating: " + rating.toUpperCase());
               //animateURL store's the image animate state
               var animateURL = results[i].images.fixed_height.url;
               //stillURL store' the image still state
               var stillURL = results[i].images.fixed_height_still.url;
               //Create an image div
               var imgDiv = $("<img>");
               imgDiv.attr({
                    "src": stillURL,
                    "data-still": stillURL,
                    "data-animate": animateURL,
                    "data-state": "still",
               });

               //Prepend the image
               sportDiv.append(imgDiv);
               sportDiv.append(ratingDiv);
               //Display the image
               $("#gifs-appear-here").append(sportDiv);
          }
     });
}//displaySportingInfor

// User click a sport gif, stop or animate it
$(document).on("click", "img", function() {
     //Make a variable named state and then store the image's data-state into it.
     var state = $(this).attr("data-state");
     //Check if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.
     if (state === "still") {
          var animate = $(this).attr("data-animate");
          $(this).attr({
               "data-state": "animate",
               "src": animate
          });
     // If state does not equal 'still', then update the src attribute of this
     // image to it's data-animate value and update the data-state attribute to 'still'
     }else {
          var still = $(this).attr("data-still");
          $(this).attr({
               "data-state": "still",
               "src": still
          });
     }
});

        // This function handles events where a sport button is clicked
         $("#add-sport").on("click", function(event) {
              event.preventDefault();
              // This line grabs the input from the textbox
              var sportInput = $("#sport-input").val().trim();
              // Adding movie from the textbox to our array
              sport_class.sports.push(sportInput);

              // Calling renderButtons which handles the processing of our movie array
             sport_class.renderButtons();
         });
         // Adding a click event listener to all elements with a class of "sport"
         $(document).on("click", ".sport", displaySportInfo);

           // Calling the renderButtons function to display the intial buttons
           sport_class.renderButtons();