var html_prompt = document.getElementById("prompt");
var html_test = document.getElementById("test");

const COLORS = ["black", "red", "blue", "green"];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function pick_random(array){
    return array[random(0, array.length-1)];
}

var is_same;
var score = 0;

function play() {
    var prompt_color = pick_random(COLORS);
    is_same = random(0, 1);
    html_prompt.innerText = prompt_color.toUpperCase();
    html_test.innerText = pick_random(COLORS).toUpperCase();
    var test_color = prompt_color;
    while ((test_color == prompt_color) != is_same) {
        test_color = pick_random(COLORS);
    }
    html_test.style.color = test_color;
}

function process(answer) {
    if (is_same == answer) score++;
    else score--;
    document.getElementById("score").innerText = score;
    play();
}

play();

/* TODO: multiplier */