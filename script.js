(function() {
    var link = "https://elegant-croissant.glitch.me/spotify";
    var nextUrl;

    $(".submit-btn").on("click", function() {
        var userInput = $('input[name="user-input"]').val();
        var albumOrArtist = $(".artist-or-album").val();
        $.ajax({
            url: link,
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                showArtists(response);
                // checkScrollPosition();
            }
        });
    });

    $(".load-more-btn").on("click", function() {
        var loadNext = "";
        $.ajax({
            url: nextUrl,
            success: function(response) {
                showArtists(response);
                // checkScrollPosition();
            }
        });
        $(".results").append(loadNext);
    });

    function showArtists(data) {
        response = data.artists || data.albums;
        console.log(response.items);

        var loadArtists = "";
        if (response.next) {
            nextUrl = response.next.replace(
                "https://api.spotify.com/v1/search",
                link
            );
            $(".load-more-btn").show();
        }
        if (response.items.length == 0) {
            loadArtists +=
                '<div class="no-result">' + "nothing to see here" + "</div>";
        }
        for (var i = 0; i < response.items.length; i++) {
            if (response.items[i].images[0]) {
                loadArtists +=
                    '<a href="' +
                    response.items[i].external_urls.spotify +
                    '" target="_blank"><div><img class="image" src="' +
                    response.items[i].images[0].url +
                    '"></div></a>';
            } else {
                loadArtists +=
                    '<a href="' +
                    response.items[i].external_urls.spotify +
                    '" target="_blank"><div><img class="image" src="spotify-1-logo-black-and-white.png"></div></a>';
            }
            loadArtists +=
                '<a href="' +
                response.items[i].external_urls.spotify +
                '" target="_blank"><div class="results">' +
                response.items[i].name +
                "</div></a>";
            console.log(response.items[i].name);
        }
        $(".results").html(loadArtists);
        // $(".results").append(loadNext);
    }

    // function checkScrollPosition() {
    //     $(".load-more-btn").hide();
    //     var hasReachedBottom =
    //         $(document).scrollTop() + $(window).height() >
    //         $(document).height() - 50;
    //     console.log(hasReachedBottom);
    //
    //     if (hasReachedBottom) {
    //         $(".load-more-btn").triggerHandler("click");
    //     } else {
    //         setTimeout(checkScrollPosition, 1000);
    //     }
    // }
    // $(window).scroll(function() {
    //     if (
    //         $(window).scrollTop() ==
    //         $(document).height() - $(window).height()
    //     ) {
    //         showArtists();
    //         $(loadArtists).append(loadNext);
    //     }
    // });
})();
