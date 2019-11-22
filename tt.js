var html_a = document.getElementById("a")
var html_b = document.getElementById("b")
var html_c = document.getElementById("c")
var html_gratz = document.getElementById("gratz");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var a, b, c, score=0, time=Date.now(), limit=10;
var play = true;

function reset() {
    a = random(2, 12);
    b = random(2, 12);
    c = "";
    html_a.innerHTML = a;
    html_b.innerHTML = b;
    html_c.innerHTML = c;
}

document.onkeydown = function(e) {
    if (!play) return;
    if (e.key == "Backspace") {
        e.preventDefault();
        c = c.slice(0, -1);
    }
    else c += e.key;
    if (a*b == c) {
        score += 1;
        reset();
    }
    if (score == limit) {
        var length = Date.now() - time;
        length /= 1000;
        document.getElementById("tt").innerHTML = "";
        html_gratz.innerHTML = `You completed ${score} questions in ${length.toFixed(1)} seconds.`;
        play = false;
    }
    html_c.innerHTML = c;
}

reset();
