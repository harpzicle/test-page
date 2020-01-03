function random(low, high) {
    if (high < low) [low, high] = [high, low];
    return Math.round(low + Math.random() * (high-low));
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

var html_table = document.getElementsByTagName("TABLE")[0];

const HEIGHT = html_table.rows.length;
const WIDTH = html_table.rows[0].cells.length;
var current = 1;
var start_time, end_time;
var list = Array(WIDTH * HEIGHT);
for (let i=1; i <= WIDTH * HEIGHT; i++) {
    list[i-1] = i;
}

function reset_game() {
    current = 1;
    shuffle(list);
    for (let i=1; i <= WIDTH * HEIGHT; i++) {
        document.getElementById(i).innerHTML = list[i-1];
    }
    html_table.style.display = "table";
}

function flash_color(elem, color, time) {
    var old_color = elem.style.backgroundColor;
    elem.style.backgroundColor = color;
    setTimeout(()=>{elem.style.backgroundColor = old_color;}, time);
}

function process(elem) {
    if (current == 1) {
        start_time = Date.now();
    }
    if (elem.innerText == current) {
        flash_color(elem, "#080", 100);
        current++;
    }
    else {
        flash_color(elem, "#800", 300);
    }
    if (current-1 == WIDTH*HEIGHT) {
        end_time = Date.now();
        html_table.style.display = "none";
        document.getElementById("gratz").innerHTML=`You took ${((end_time - start_time)/1000).toFixed(1)}s to finish`;
    }
}

reset_game();
