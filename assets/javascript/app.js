$(function(){ // .ready() handler
	const APIKEY = "KK7pN6mRtmXhj5FP3FEPH3zenQ3tE9O1";

	// topics array
    var topics = ["birds","cats", "dogs", "horses", "reptiles" , "exotic animals"];

	// Function to create and display buttons on HTML
	function renderButtons() {
		$("#btn-list").empty();
		for(var i = 0; i < topics.length; i++){
		  var btn = $("<button>").addClass("btn btn-default btn-topics");
		  btn.text(topics[i]); 
		  btn.val(topics[i]);
		  // use append so most recent user input value is at top of button list
		  $("#btn-list").append(btn);
		}
	}

	// Function that updates HTML with the gifs of the selected topics
	function displayGifs(){
		$("#gif-content").empty();
		
		// update search term with clicked button value
		var searchTerm = $(this).val();

		// Query the api for selected content
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+searchTerm+"&limit=10";    
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {
			var results = response.data;
			console.log(response)
			console.log(response.data[5].slug)
	    	// Loop through results array and construct HTML containing gifs
	    	for (var i = 0; i < results.length; i++){
	    		// Create Div to store elements of gif to be displayed
		        var gifDiv = $("<div>").addClass("thumbnail");

		        // Create p element to store the rating from API
		        var p = $("<p>").addClass("caption").text("Rating: " + results[i].rating);

		        // Create image element to store the still and animated gif url from API
		        var gifImage = $("<img>").addClass("gif");
		        gifImage.attr("src", results[i].images.fixed_width_still.url);
		        gifImage.attr("src-alt", results[i].images.fixed_width.url);

		        // Attach image and paragraph elements to the gifDiv and then to gif-content of HTML
		        gifDiv.append(gifImage).append(p);
		        $("#gif-content").prepend(gifDiv);
	    	};
	    });
	}

	// Function that toggles the source of the image between still and animated
	function togglePlay(){
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("src-alt"));
		$(this).attr("src-alt", temp);
	}

	// Function that returns true if topics already exists in topics array. False, otherwise.
	function topicsExists(userInput){
		for(var i = 0; i < topics.length; i++){
			if(userInput === topics[i]){
				return true;
			}
		}
		return false;
	}

	// Event handler for user adding a topics from the form input
	$("#add-topics").on("click", function(event){
		// Prevent button from submitting the form
		event.preventDefault();
		var newtopics = $("#topics-input").val().trim();
		
		// Only add topics if it doesn't already exist or isn't empty
		if(newtopics !== "" && !topicsExists(newtopics)) {
			topics.push(newtopics);
			renderButtons();
		}
	});

	// Delegated event handlers for displaying and playing gifs
	$(document).on("click", ".btn-topics", displayGifs);
	$(document).on("click", ".gif", togglePlay);

renderButtons();
}); // end .ready() handler