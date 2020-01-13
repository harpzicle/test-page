/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * durstenfeld shuffle (in place)
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var url_params = new URLSearchParams(location.search);
var html_table = document.getElementsByTagName("TABLE")[0];

var HEIGHT = url_params.get("height") || url_params.get("h") || 5;
var WIDTH = url_params.get("width") || url_params.get("w") || 5;

function create_table(w, h) {
    var insert = "";
    for (let i = 0; i < h; i++) {
        insert += "<tr>";
        for (let j = 1; j <= w; j++) {
            let count = i*w + j;
            insert += `<td onclick="process(this)" id="${count}"></td>`;
        }
        insert += "</tr>";
    } /* generate table */
    html_table.innerHTML = insert;
}

function set_active(activity) {
    for (let i=1; i <= WIDTH*HEIGHT; i++)
        document.getElementById(i).active = activity;
}

var selected;

var blocks = 4;
var lives = blocks;
var wrong = 0;
var score = 0;
var wins = 0;
var just_won = false;
var enlarged = false;
var MEMORY_TIME = 2000;

function play() {
    create_table(WIDTH, HEIGHT);
    lives = blocks;
    wrong = 0;
    selected = [];
    for (let i=1; i<=WIDTH*HEIGHT; i++) {
        selected.push(i);
    }
    shuffle(selected);
    selected = selected.slice(0, blocks);
    set_active(false);
    for (const i of selected) {
        var cell = document.getElementById(i);
        cell.style.backgroundImage = "linear-gradient(160deg, #07c, #07f)";
        setTimeout(() => {
            var cell = document.getElementById(i);
            cell.style.backgroundImage = ""; 
        }, MEMORY_TIME);
    }
    setTimeout(() => {set_active(true);}, MEMORY_TIME);
}

function process(elem) {
    if (!elem.active) return;
    const id = parseInt(elem.id)
    const idx = selected.indexOf(id);
    if (idx != -1) {
        selected.splice(idx, 1);
        elem.style.backgroundImage = "linear-gradient(160deg, #2c2, #1f3)";
        lives--;
        score += 100;
    }
    else {
        elem.innerHTML = "&times;";
        elem.style.backgroundImage = "linear-gradient(160deg, #c11, #f30)";
        lives--;
        wrong++;
    }
    elem.active = false;
    if (lives == 0) end_game();
}

function end_game() {
    if (wrong == 0) {
        var bonus = blocks * blocks * 30;
        bonus = 50 * (bonus/50).toFixed(); /* round to 50 */;
        score += bonus;
        wins++;
        blocks++;
        just_won = true;
        MEMORY_TIME += 100;
    }
    else {
        just_won = false;
        blocks--;
        if (enlarged) {
            (WIDTH > HEIGHT) ? WIDTH-- : HEIGHT--;
            enlarged = false;
        }
    }
    set_active(false);
    if (wins > 0 && wins % 3 == 0 && just_won) {
        (WIDTH < HEIGHT) ? WIDTH++ : HEIGHT++;
        enlarged = true;
    }
    for (const i of selected) {
        var cell = document.getElementById(i);
        cell.style.backgroundImage = "linear-gradient(160deg, #07c, #07f)";
    }
    setTimeout(play, 1000);
}

var html_lives = document.getElementById("lives");
var html_score = document.getElementById("score");
setInterval(() => {
    html_lives.innerText = lives;
    html_score.innerText = score;
}, 100);

play();