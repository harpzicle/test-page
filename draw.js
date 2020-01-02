var clockRatio = 0.99, size;
var hr = 0.4, min = 0.8, sec = 0.9; 
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dotSize = 4;

ctx.dot = function(x, y, r) {
    ctx.beginPath();
    ctx.arc(x,y,r, 0,2*Math.PI);
    ctx.fill();
};

function drawClockPositions(n, n_minor, major_r, minor_r) {
    for (var i=0; i<n; i++) {
        var angle = 2 * Math.PI / n * i;
        var y = 1 - clockRatio * Math.cos(angle);
        var x = 1 + clockRatio * Math.sin(angle);
        y *= size / 2;
        x *= size / 2;
        x = Math.round(x);
        y = Math.round(y);
        if (i % n_minor)
            ctx.dot(x, y, minor_r);
        else 
            ctx.dot(x, y, major_r);
    }
}

function drawHands(){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ms = now.getMilliseconds();
    var h,m,s;

    s = (second + ms/1000) * 2*Math.PI / 60;

    ctx.fillStyle = "#f00";
    ctx.strokeStyle = "#500";
    drawTime(s, sec);
    
    m = (minute + second/60 + ms/60000) * 2*Math.PI / 60;

    ctx.fillStyle="#fff";
    ctx.strokeStyle="#555";
    drawTime(m, min);    
    
    hour = hour%12;
    h = (hour + minute/60 + second/3600 + ms/3600000) * 2*Math.PI / 12;

    ctx.fillStyle="#fff";
    ctx.strokeStyle="#555";
    drawTime(h, hr);
}

function drawTime(param, mult) {
    var y = 1 - clockRatio * mult * Math.cos(param);
    var x = 1 + clockRatio * mult * Math.sin(param);
    y *= size / 2;
    x *= size / 2;
    //x = Math.round(x);
    //y = Math.round(y);
    ctx.beginPath();
    ctx.setLineDash([1,9]);
    ctx.moveTo(size/2, size/2);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.dot(x, y, dotSize);
}

function drawClock() {
    var width = canvas.width = document.body.clientWidth;
    var height = canvas.height = document.body.clientHeight;
    size = Math.min(height, width);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0,0,size,size);
    ctx.setTransform(1,0,0,1,0,0);
    if (width > height) {
        ctx.translate((width - height)/2,0);
    }
    else if (width < height) {
        ctx.translate(0,(height - width)/2);
    }

    ctx.fillStyle = "#555";
    drawClockPositions(60, 5, 3, 1.2);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#555";
    drawHands();
    ctx.fillStyle = "#fff";
    ctx.dot(size/2, size/2, dotSize/2);
}

setInterval(drawClock, 20);