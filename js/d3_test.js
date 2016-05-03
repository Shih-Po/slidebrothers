var pairs = [{
                "genre": "Action",
                "color": "#D9D375"
            }, {
                "genre": "Adventure",
                "color": "#e9724c"
            }, {
                "genre": "Animation",
                "color": "#12664F"
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
                "color": "#00008B"
            }, {
                "genre": "Drama",
                "color": "#809DE1"
            }, {
                "genre": "Fantasy",
                "color": "#d999b9"
            }, {
                "genre": "Film-Noir",
                "color": "#9db997"
            }, {
                "genre": "Horror",
                "color": "#255f85 "
            }, {
                "genre": "Musical",
                "color": "#BA55D3"
            }, {
                "genre": "Mystery",
                "color": "#90e0f3"
            }, {
                "genre": "Romance",
                "color": "#c5283d"
            }, {
                "genre": "Sci-Fi",
                "color": "#CD853F"
            }, {
                "genre": "Thriller",
                "color": "#b8b3e9"
            }, {
                "genre": "War",
                "color": "#5d3d62"
            }, {
                "genre": "Western",
                "color": "#d17b88"
            }, {
                "genre": "1980-",
                "color": "#242423"
            }, {
                "genre": "1980~2000",
                "color": "#242423"
            }, {
                "genre": "2000+",
                "color": "#242423"
            }, {
                "genre": "All",
                "color": "#242424"
            }, {
                "genre": "None",
                "color": "#DDDDDD"
            }];

var selected_genres = ["Action",
                        "Adventure",
                        "Animation",
                        "Children",
                        "Comedy",
                        "Crime",
                        "Documentary",
                        "Drama",
                        "Fantasy",
                        "Film-Noir",
                        "Horror",
                        "Musical",
                        "Mystery",
                        "Romance",
                        "Sci-Fi",
                        "Thriller",
                        "War",
                        "Western"
                    ],
    selected_year = [1, 1, 1];


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

    // $('#div-right').append('<h3 id="h3-title">' + d.title + '</h3>');
    var id = d.imdbId;
    var omdbURL = 'http://www.omdbapi.com/?i=' + id + '&plot=long&r=json';
    // 改寫為用 PHP 從 MySQL 抓
    $.getJSON(omdbURL, function(data) {
        $('#div-right').append('<img src=\"' + data.Poster + '\"></img>');
        $('body').append('<div id="div-bottom"></div>');
        $('#div-bottom').append('<h1>' + data.Title + '</h1>');
        $('#div-bottom').append('<p>' + data.Plot + '</p>');
    });

    $.post("conn3.php", {
            id: id
        },
        function(data, status) {
            // alert("Data: " + data + "\nStatus: " + status);
            data = JSON.parse(data);
            // $('#div-right').append('<img src=\"' + data.Poster + '\"></img>');
            var omdbURL2 = 'http://www.omdbapi.com/?i=' + data[0].r1 + '&plot=long&r=json';
            var omdbURL3 = 'http://www.omdbapi.com/?i=' + data[0].r2 + '&plot=long&r=json';
            var omdbURL4 = 'http://www.omdbapi.com/?i=' + data[0].r3 + '&plot=long&r=json';
            $.getJSON(omdbURL2, function(data) {
                $('#div-bottom').append('<img src=\"' + data.Poster + '\"></img>');
            });
            $.getJSON(omdbURL3, function(data) {
                $('#div-bottom').append('<img src=\"' + data.Poster + '\"></img>');
            });
            $.getJSON(omdbURL4, function(data) {
                $('#div-bottom').append('<img src=\"' + data.Poster + '\"></img>');
            });
        })
    $('#div-right').click(function() {
        $('#div-bottom').show();
        $('html, body').animate({ scrollTop: $('#div-bottom').offset().top }, 200);
        $('#div-bottom img').show(600);
        $('#div-bottom h1').show(600);
        $('#div-bottom p').show(600);
    });
}

function mouseClickOnButton() {
    // 1. Change button style
    //alert('ok');
    // $(this).toggleClass( 'clicked' );
    var col = $(this).css("background-color");
    
    // 2. Renew circles of map
    clicked = $(this).children().text();
    if (clicked == 'All') {
        selected_genres = ["Action", "Adventure", "Animation", "Children", "Comedy",
            "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical",
            "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western",
            "All" ];

        // select all the div.tag without 'None'
        $(".tag[value!='#DDDDDD']").each(function(i, e){
            $(e).css({
                "background-color": pairs[i].color,
                "color": "white"
            });
        });
    }
    else if (clicked == 'None') {
        selected_genres = [];
        selected_year = [0, 0, 0];
        // select all the div.tag without 'All'
        $(".tag[value!='#242424']").css({
                "background-color": "rgb(255, 250, 250)",
                "color": "silver",
            });
    }
    else {
        // change the selected_year array
        if (clicked == "1980-") {
            if (selected_year[0] == 1) { selected_year[0] = 0; } 
            else { selected_year[0] = 1; }
        }
        if (clicked == "1980~2000") {
            if (selected_year[1] == 1) { selected_year[1] = 0; }
            else { selected_year[1] = 1; }
        }
        if (clicked == "2000+") {
            if (selected_year[2] == 1) { selected_year[2] = 0; }
            else { selected_year[2] = 1; }
        }

        // change buttons color
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
        function checkExist(genre) {
            return genre == clicked;
        }
        if (selected_genres.find(checkExist) == clicked) {
            selected_genres.splice(selected_genres.indexOf(clicked), 1);
        } else {
            selected_genres.push(clicked);
        }
    }
    // alert(clicked);
    

    // alert(genres);
    $.post("conn2.php", {
            genres: selected_genres,
            year: selected_year
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
                        return d.count / 200 - 10;
                    },
                    'cy': function(d, i) {
                        return d.avg * 80 - 300;
                    },
                    'r': function(d, i) {
                        return 4;
                    },
                    'fill': function(d, i) {
                        var genres_array = d.genres.split('|');

                        // check display color includes in selected genres colors
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
