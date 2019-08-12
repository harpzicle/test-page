function regional(){
  text = document.getElementById("reg-input").value
  big = "";
  small = "";
  alphabet = "abcdefghijklmnopqrstuvwxyz";
  REG = 127462;

  for (const letter of text.toLowerCase()) {
    big += alphabet.includes(letter) ? (":regional_indicator_"+letter+":") : "   ";
    small += alphabet.includes(letter) ? String.fromCodePoint(alphabet.search(letter) + REG) : " ";
  }
  document.getElementById("reg-output-big") = big;
  document.getElementById("reg-output-small") = small;
}
