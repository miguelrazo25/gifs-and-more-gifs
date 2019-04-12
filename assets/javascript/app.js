$(document).ready(function () {
	var chia = ["Nahuatl", "Cerveza", "Tequila", "Tenochtitlan", "Chapulin", "Guacamole", "Chocolate", "Mezcal"];
	function renderButtons() {
		$("#botones").empty();
		for (i = 0; i < chia.length; i++) {
			$("#botones").append("<button class = 'btn btn-warning' esto = '" + chia[i] + "'>" + chia[i] + "</button>");
		}
	}
	renderButtons();
	$("#agregar").on("click", function () {
		event.preventDefault();
		var maiz = $("#gusano").val().trim();
		chia.push(maiz);
		renderButtons();
		return;
	});
	$("button").on("click", function () {
		var elote = $(this).attr("esto");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			elote + "&api_key=lVl4CNQlRejMq69u0HxNnRfxrT9jKKga"
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#chile").empty();
			for (var i = 0; i < results.length; i++) {
				var otro = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var foto = $("<img>");
				foto.attr("src", results[i].images.original_still.url);
				foto.attr("data-still", results[i].images.original_still.url);
				foto.attr("data-animate", results[i].images.original.url);
				foto.attr("data-state", "still");
				foto.attr("class", "gif");
				otro.append(p);
				otro.append(foto);
				$("#chile").append(otro);
			}
		});
	});
	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");
		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}
		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
	$(document).on("click", ".gif", changeState);
});