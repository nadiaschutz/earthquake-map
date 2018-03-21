var mapimg;
var clat = 0;
var clon = 0;
var earthquake;

//57.8540° N, 114.2012° E
var lat = 57.8540;
var lon = 114.201;
var zoom = 1;

function preload() {
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoibmFkaWFzY2h1dHoiLCJhIjoiY2pmMWVxYndmMHo4ZDJ3bzB6NXVnbnV1YSJ9.1z6izLQbOoDfzPEUmQFO-A');
    earthquake = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

function mercY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c;
}

function setup() {
    createCanvas(1024, 512);
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(mapimg, 0, 0);

    var cx = mercX(clon);
    var cy = mercY(clat);

    for (var i = 0; i < earthquake.length; i++) {
        var data = earthquake[i].split(/,/);
        console.log(data);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        mag = pow(10, mag);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10, 10));


        var d = map(mag, 0, magmax, 0, 180);
        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }


}
