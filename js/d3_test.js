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
           'x': function(d, i) { return d.count * 2 + 10; },
           'y': function(d, i) { return d.avg * 100; },
           'width': function(d, i) { return d.title.length * 6.5},
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
           'x': function(d, i) { return d.count * 2 + 18; },
           'y': function(d, i) { return d.avg * 100 + 15; },
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

   $('#div-right').append('<h3 id="h3-title">' + d.title + '</h3>')
   ;

   $.getJSON(omdbURL, function(data) {
       $('#div-right').append('<img width="90%" src=\"' + data.Poster + '\">')
       ;
   });
}

function mouseClickOnButton(d, i) {
    // 1. Change button style
    //alert('ok');
    // $(this).toggleClass( 'clicked' );
    var col = $(this).css("background-color");

    if (col!="rgb(255, 250, 250)"){
        $(this).css({
            "background-color":"rgb(255, 250, 250)",
            "color":"silver"
        });
    }
    if (col=="rgb(255, 250, 250)"){
        var val = $(this).attr("value");
        $(this).css({
            "background-color":val,
            "color":"white"
        });     
    }

    // 2. Renew circles of map

}

