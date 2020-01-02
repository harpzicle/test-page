var html_a = document.getElementById("a")
var html_b = document.getElementById("b")
var html_gratz = document.getElementById("gratz");
var html_wrong = document.getElementById("wrong");
var html_tt = document.getElementById("tt");
var html_info = document.getElementById("info");

var original = "<span id=\"a\">0</span> &times; <span id=\"b\">0</span>";
var game_interval = setInterval(game_timer, 20);

const MAX_TABLE = 12;

var a=0, b=0, c
var count = 0; /* the number of questions attempted */
var score = 0; 
var time = Date.now();
var limit = 150; /* game length in seconds */
var old_a = 0, old_b = 0;
var play = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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

var html_ans1 = document.getElementById("one");
var html_ans2 = document.getElementById("two");
var html_ans3 = document.getElementById("three");
var html_ans4 = document.getElementById("four");

var htmls = [html_ans1, html_ans2, html_ans3, html_ans4];

function generate_options(){
    var right = a*b;
    var wrong1 = (a+1) * b;
    var wrong2, wrong3;

    if (a != b) {
        wrong2 = a * (b+1);
    }
    else {
        wrong2 = (a-1) * b;
    }

    do {
        wrong3 = random(2, MAX_TABLE) * random(2, MAX_TABLE); 
    } while (wrong3 in [right, wrong1, wrong2]);
    var answers = [right, wrong1, wrong2, wrong3];
    shuffle(answers);
    return answers;
}

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * durstenfeld shuffle (in place)
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function reset() {
    while (pair_equal(old_a, old_b, a, b)) {
        a = random(2, MAX_TABLE);
        b = random(2, MAX_TABLE);
    }
    var answers = generate_options(answers);
    old_a = a;
    old_b = b;
    html_a.innerHTML = a;
    html_b.innerHTML = b;
    for (let i=0; i<4; i++) {
        htmls[i].innerHTML = answers[i];
        htmls[i].onclick = function(){process(answers[i]);};
    }
}
function process(ans) {
    if (a*b == ans) score++;
    count++;
    reset();
}

document.onkeydown = function(e) {
    if ('1234'.includes(e.key)) {
        htmls[e.key - 1].onclick();
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
}

reset();