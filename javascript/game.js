var animals = ["cat", "dog", "bird"];

// function alertanimalName() {
//     var animalName = $(this).attr("data-name");
//     console.log(this)
//     console.log(animalName)
//     alert(animalName);
// }

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        a.addClass("animalButton");
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);

        $("#buttons-view").append(a);

        console.log(animals[i]);
    }
}

$("#add-animal").on("click", function (event) {

    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    animals.push(animal);

    renderButtons();

});

$(document).on("click", ".animalButton", function () {
    var animalGif = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalGif + "&api_key=dc6zaTOxFJmzC&limit=5";

    console.log(animalGif);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr("class", "image-gif");
                animalImage.attr("data-state", "animate");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
});

$(document).on('click', ".image-gif", function () {
    var src = $(this).attr("src");
    if ($(this).attr("data-state") === "animate") {
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
        $(this).attr("data-state", "animate");
    }
});

// $(document).on("click", ".animal", alertanimalName);

renderButtons();