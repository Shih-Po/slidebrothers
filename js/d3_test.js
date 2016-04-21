function mouseOver(d, i) {
    d3.select(this).attr({
        'stroke': 'white',
        'stroke-width': 2,
        'r': 9
    });
    var datum = [].concat(d);
    d3.select('svg')
        .selectAll('rect')
        .data(datum)
        .enter()
        .append('rect')
        .attr({
            'x': function(d, i) {
                return d.count * 2 + 10;
            },
            'y': function(d, i) {
                return d.avg * 100;
            },
            'width': function(d, i) {
                return d.title.length * 6.5
            },
            'height': '20px',
            'stroke': 'black',
            'fill': 'white'
        });
    d3.select('svg')
        .selectAll('text')
        .data(datum)
        .enter()
        .append('text')
        .attr({
            'x': function(d, i) {
                return d.count * 2 + 18;
            },
            'y': function(d, i) {
                return d.avg * 100 + 15;
            },
            'font-size': '10'
        }).text(function(d, i) {
            return d.title;
        });
}

function mouseOut(d, i) {
    d3.select(this).attr({
        'stroke': 'grey',
        'r': 3
    });
    d3.select('svg')
        .selectAll('rect')
        .remove();
    d3.select('svg')
        .selectAll('text')
        .remove();
}

function mouseClickOnCircle(d, i) {
    $('img').remove();
    $('#h3-title').remove();
    var id = 'tt' + d.imdbId,
        omdbURL = 'http://www.omdbapi.com/?i=' + id + '&plot=short&r=json';

    $('#div-right').append('<h3 id="h3-title">' + d.title + '</h3>');

    $.getJSON(omdbURL, function(data) {
        $('#div-right').append('<img width="90%" src=\"' + data.Poster + '\">');
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
            "color": "silver"
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
    if (genres.find(checkExist) == clicked) {
      genres.splice(genres.indexOf(clicked),1);
    }
    else{
      genres.push(clicked);
    }
    // alert(genres);
    $.post("conn.php", {
            genres: genres
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
                        return d.count * 2;
                    },
                    'cy': function(d, i) {
                        return d.avg * 100;
                    },
                    'r': function(d, i) {
                        return 3;
                    },
                    'fill': function(d, i) {
                        var genres = d.genres.split('|');
                        var genre = genres[0];
                        var pairs = [{
                            "genre": "Action",
                            "color": "#ffc857"
                        }, {
                            "genre": "Adventure",
                            "color": "#e9724c"
                        }, {
                            "genre": "Animation",
                            "color": "#c5283d"
                        }, {
                            "genre": "Children",
                            "color": "#255f85"
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
                            "color": "#75f4f4"
                        }, {
                            "genre": "Fantasy",
                            "color": "#d999b9"
                        }, {
                            "genre": "Film-Noir",
                            "color": "#de3ca0"
                        }, {
                            "genre": "Horror",
                            "color": "#fee2c8 "
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
                        }]
                        for (var i = 0; i < pairs.length; i++) {
                            if (genre === pairs[i].genre) {
                                return pairs[i].color;
                            }
                        }
                    },
                    'stroke': 'grey',
                    'stroke-width': '1px'
                })
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', mouseClickOnCircle);

        });
}
