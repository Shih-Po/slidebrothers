var pairs = [{
    "genre": "Action",
    "color": "#D9D375"
}, {
    "genre": "Adventure",
    "color": "#e9724c"
}, {
    "genre": "Animation",
    "color": "#c5283d"
}, {
    "genre": "Children",
    "color": "#fee2c8"
}, {
    "genre": "Comedy",
    "color": "#CEEC97"
}, {
    "genre": "Crime",
    "color": "#576CA8"
}, {
    "genre": "Documentary",
    "color": "#242423"
}, {
    "genre": "Drama",
    "color": "#809DE1"
}, {
    "genre": "Fantasy",
    "color": "#d999b9"
}, {
    "genre": "Film-Noir",
    "color": "#de3ca0"
}, {
    "genre": "Horror",
    "color": "#255f85 "
}, {
    "genre": "Musical",
    "color": "#12664F"
}, {
    "genre": "Mystery",
    "color": "#774E24 "
}, {
    "genre": "Romance",
    "color": "#9db997"
}, {
    "genre": "Sci-Fi",
    "color": "#90e0f3"
}, {
    "genre": "Thriller",
    "color": "#b8b3e9"
}, {
    "genre": "War",
    "color": "#5d3d62"
}, {
    "genre": "Western",
    "color": "#d17b88"
}];


function mouseOver(d, i) {
    var datum = [].concat(d);
    // bring this circle to top (easy method)
    this.parentNode.appendChild(this);

    // try to remove this then append a new circle (it can't work)
    // var this_color = $(this).attr('fill');
    // d3.select('svg').selectAll('circle')
    //     .data(datum).enter()
    //     .attr({
    //         'cx': function(d, i) { return d.avg * 125 - 30; },
    //         'cy': function(d, i) { return d.count * 1.4 + 10; },
    //         'r': 6,
    //         'fill': this_color
    //     })        
    //     .on('mouseover', mouseOver)
    //     .on('mouseout', mouseOut)
    //     .on('click', mouseClickOnCircle)
    // ;
    // d3.select(this).remove();

    // add movie label
    d3.select('svg').selectAll('rect')
        .data(datum).enter()
        .append('rect')
        .attr({
            'y': function(d, i) {
                if (d.count * 1.40 < 400) {
                    return d.count * 1.40 + 30;
                } else {
                    return d.count * 1.40 - 30;
                }
            },
            'width': '1280px',
            'height': '20px',
            'fill': '#535B84'
        });
    d3.select('svg')
        .selectAll('text')
        .data(datum)
        .enter()
        .append('text')
        .attr({
            // 'x': function(d, i) { return d.avg * 115; },
            'x': '50%',
            'y': function(d, i) {
                if (d.count * 1.40 < 400) {
                    return d.count * 1.40 + 44;
                } else {
                    return d.count * 1.40 - 16;
                }
            },
            'font-size': '12',
            'text-anchor': 'middle',
            'fill': 'white'
        })
        .text(function(d, i) {
            return d.title;
        });
}

function mouseOut(d, i) {
    d3.select(this).attr({
        'stroke': '',
        'stroke-width': '',
        'r': 4
    });
    d3.select('svg').selectAll('rect').remove();
    d3.select('svg').selectAll('text').remove();
}

function mouseClickOnCircle(d, i) {
    $('#div-right img').remove();
    $('#h3-title').remove();
    $('#div-bottom h1').remove();
    $('#div-bottom p').remove();
    var id = 'tt' + d.imdbId,
        omdbURL = 'http://www.omdbapi.com/?i=' + id + '&plot=long&r=json';

    // $('#div-right').append('<h3 id="h3-title">' + d.title + '</h3>');
    $.getJSON(omdbURL, function(data) {
        $('#div-right').append('<img src=\"' + data.Poster + '\"></img>');
        $('body').append('<div id="div-bottom"></div>');
        $('#div-bottom').append('<h1>' + data.Title + '</h1>');
        $('#div-bottom').append('<p>' + data.Plot + '</p>');
    });
    $('#div-right').click(function() {
        $('#div-bottom').show();
        $('html, body').animate({ scrollTop: $('#div-bottom').offset().top }, 800);
        $('#div-bottom h1').show(800);
        $('#div-bottom p').show(800);
    });
}

function mouseClickOnButton() {
    // 1. Change button style
    //alert('ok');
    // $(this).toggleClass( 'clicked' );
    var col = $(this).css("background-color");

    if (col != "rgb(255, 250, 250)") {
        $(this).css({
            "background-color": "rgb(255, 250, 250)",
            "color": "silver",
        });
    }
    if (col == "rgb(255, 250, 250)") {
        var val = $(this).attr("value");
        $(this).css({
            "background-color": val,
            "color": "white"
        });
    }

    // 2. Renew circles of map
    clicked = $(this).children().text();
    // alert(clicked);
    function checkExist(genre) {
        return genre == clicked;
    }
    if (selected_genres.find(checkExist) == clicked) {
        selected_genres.splice(selected_genres.indexOf(clicked), 1);
    } else {
        selected_genres.push(clicked);
    }

    // alert(genres);
    $.post("conn.php", {
            "genres": selected_genres
        },
        function(data, status) {
            // alert("Data: " + data + "\nStatus: " + status);
            data = JSON.parse(data);
            $('circle').remove();
            var circle = d3.select('svg')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr({
                    'cx': function(d, i) {
                        return d.avg * 125 - 30;
                    },
                    'cy': function(d, i) {
                        return d.count * 1.4 + 10;
                    },
                    'r': function(d, i) {
                        return 4;
                    },
                    'fill': function(d, i) {
                        var genres_array = d.genres.split('|');

                        // check display color includes in selected gen's colors
                        var i = Math.floor(Math.random() * genres_array.length);
                        while (selected_genres.indexOf(genres_array[i]) === -1) {
                            // console.log(genres_array[i]);
                            i = Math.floor(Math.random() * genres_array.length);
                        }

                        var genre = genres_array[i];

                        for (var i = 0; i < pairs.length; i++) {
                            if (genre === pairs[i].genre) {
                                return pairs[i].color;
                            }
                        }
                    },
                    // 'stroke': '#3C3C3C',
                    // 'stroke-width': '1px'
                })
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', mouseClickOnCircle);
        });
}
