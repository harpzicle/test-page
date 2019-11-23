var html_a = document.getElementById("a")
var html_b = document.getElementById("b")
var html_c = document.getElementById("c")
var html_gratz = document.getElementById("gratz");
var html_wrong = document.getElementById("wrong");

var original = "<span id=\"a\">0</span> &times; <span id=\"b\">0</span> = <span id=\"c\"></span>";

var timer_interval = setInterval(timer, 20);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function timer() {
    var length = (Date.now() - time) / 1000; /* ms to second */
    html_gratz.innerHTML = `You've got ${score}/${count} questions in ${length.toFixed(1)} seconds.`;
}

var a=0, b=0, c, score=0, time=Date.now(), limit=15, count = 0;
var old_a=0, old_b=0;
var play = true;

function pair_equal(a,b,c,d) {
    return (a==c && b==d) || (a==d && b==c);
}

function reset() {
    while (pair_equal(old_a, old_b, a, b)) {
        a = random(2, 12);
        b = random(2, 12);
    }
    old_a = a;
    old_b = b;
    c = "";
    html_a.innerHTML = a;
    html_b.innerHTML = b;
    html_c.innerHTML = c;
}

function restart() {
    a=b=c=score=count=old_a=old_b=0;
    play = true;
    time=Date.now();
    document.getElementById("tt").style.display = "block";
    timer_interval = setInterval(timer, 20);
}

function stop_game() {
    document.getElementById("tt").style.display = "none";
    clearInterval(timer_interval);
    timer();
    play = false;
}

document.onkeydown = function(e) {
    if (e.key == "Backspace") {
        e.preventDefault();
        c = c.slice(0, -1);
    }
    else if (e.key == "Enter") {
        if (play) {
            count++;
            reset();
        }
        else restart();
    }
    else if (e.key == "Escape") {
        stop_game();
    }
    else c += e.key;
    if (a*b == c) {
        score++;
        count++;
        reset();
    }
    if (count == limit) {
        var length = Date.now() - time;
        length /= 1000;
        stop_game();
        play = false;
    }
    html_c.innerHTML = c;
}

reset();
