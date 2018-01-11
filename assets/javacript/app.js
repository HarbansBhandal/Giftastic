function sportsClass(){
     this.sports = ["boxing", "diving", "football", "hockey", "lacrosse", "nascar", "skateboarding"];

     this.renderButtons = function () {
         
             $("#buttons-view").empty();
             //Looping thru the array of sports
             for (var i = 0; i < this.sports.length; i++){
                 
                  var sportBtn = $("<button>");
                  
                  sportBtn.addClass("sport");
                  
                  sportBtn.attr("data-name", this.sports[i]);
                 
                  sportBtn.text(this.sports[i].toUpperCase());
                  
                  $("#buttons-view").append(sportBtn);
             }
        };
}

var sport_class = new sportsClass();

//function re-renders the HTML to display the appropriate content
function displaySportInfo() {
     
     var sport = $(this).attr("data-name");

     var api = "https://api.giphy.com/v1/gifs/search?";
     var apiKey = "&api_key=dc6zaTOxFJmzC";
     var apiLimit = "&limit=10";
     var query = "q=" + sport;
     var queryURL = api + query + apiKey + apiLimit;

     
     $.ajax({
          url: queryURL,
          method: "GET"
     }).done(function(response) {
          
          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++){
               
               var sportDiv = $("<div class='sport'>");
               
               var rating = results[i].rating;
               
               var ratingDiv = $("<p class='ratingDiv'>");
               ratingDiv.text("Rating: " + rating.toUpperCase());
              
               var animateURL = results[i].images.fixed_height.url;
               
               var stillURL = results[i].images.fixed_height_still.url;
              
               var imgDiv = $("<img>");
               imgDiv.attr({
                    "src": stillURL,
                    "data-still": stillURL,
                    "data-animate": animateURL,
                    "data-state": "still",
               });

              
               sportDiv.append(imgDiv);
               sportDiv.append(ratingDiv);
               //Display the image
               $("#gifs-appear-here").append(sportDiv);
          }
     });
}//displaySportingInfor

// User click a sport gif, stop or animate it
$(document).on("click", "img", function() {
    
     var state = $(this).attr("data-state");
     
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
              
              var sportInput = $("#sport-input").val().trim();
             
              sport_class.sports.push(sportInput);

              
             sport_class.renderButtons();
         });

         $(document).on("click", ".sport", displaySportInfo);

          
           sport_class.renderButtons();
