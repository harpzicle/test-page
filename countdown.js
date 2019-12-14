var day = document.getElementById("days");
var hour = document.getElementById("hr");
var minute = document.getElementById("min");
var second = document.getElementById("sec");

var end_time = new Date(2019, 11, 16);
var end_ms = end_time.getTime();
function update_time() {
    var now_time = new Date();
    var now_ms = now_time.getTime();
    var diff = end_ms - now_ms;
    diff /= 1000;
    
    var sec = Math.floor(diff % 60);
    diff /= 60;
    
    var min = Math.floor(diff % 60);
    diff /= 60;
    
    var hrs = Math.floor(diff % 24);
    diff /= 24;
    
    var dys = Math.floor(diff);
    
    day.innerHTML = dys + " day" + (dys==1 ? "" : "s");
    hour.innerHTML = ("00" + hrs).slice(-2);
    minute.innerHTML = ("00" + min).slice(-2);
    second.innerHTML = ("00" + sec).slice(-2);
}

setInterval(update_time, 50);