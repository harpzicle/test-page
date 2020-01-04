var html_a = document.getElementById("a")
var html_b = document.getElementById("b")
var html_c = document.getElementById("c")
var html_gratz = document.getElementById("gratz");
var html_wrong = document.getElementById("wrong");
var html_tt = document.getElementById("tt");
var html_info = document.getElementById("info");

var original = "<span id=\"a\">0</span> &times; <span id=\"b\">0</span> = <span id=\"c\"></span>";
var game_interval = setInterval(game_timer, 20);

const MAX_TABLE = get_url_variable("max") || get_url_variable("tables") || 12;
const TIME_LIMIT = get_url_variable("limit") || get_url_variable("time") || 150; /* game length in seconds */

var a=0, b=0, c;
var count = 0; /* the number of questions attempted */
var score = 0; 
var time = Date.now();
var old_a = 0, old_b = 0;
var play = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* https://css-tricks.com/snippets/javascript/get-url-variables/
 * variables from url (?var=xyz etc)
 */
function get_url_variable(variable) {
    var vars = location.search.substring(1).split("&");
    for (let i=0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

function pair_equal(a,b,c,d) {
    return (a==c && b==d) || (a==d && b==c);
}

function timer() {
    var length = (Date.now() - time) / 1000; /* ms to second */
    html_gratz.innerHTML = `You've got ${score}/${count} questions in ${length.toFixed(1)} seconds.`;
}

function game_timer() {
    if (play) {
        timer();
    }
    if (Date.now() - time > (limit * 1000)) {
        stop_game();
    }
}

function reset() {
    while (pair_equal(old_a, old_b, a, b)) {
        a = random(2, MAX_TABLE);
        b = random(2, MAX_TABLE);
    }
    old_a = a;
    old_b = b;
    c = "";
    html_a.innerHTML = a;
    html_b.innerHTML = b;
    html_c.innerHTML = c;
}

function restart() {
    a=b=old_a=old_b=score=count=0;
    reset();
    c="";
    play = true;
    time=Date.now();
    html_tt.style.display = "block";
}

function stop_game() {
    if (!play) return;
    html_tt.style.display = "none";
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
        else { 
            restart();
            return;
        }
    }
    else if (e.key == "Escape") {
        stop_game();
    }
    else if ("1234567890".includes(e.key)) {
        c += e.key;
    }
    if (a*b == c) {
        score++;
        count++;
        reset();
    }
    html_c.innerHTML = c;
}

reset();
