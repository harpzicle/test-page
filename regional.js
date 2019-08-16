function regional(){
  text = document.getElementById("reg-input").value
  big = "";
  small = "";
  alphabet = "abcdefghijklmnopqrstuvwxyz";
  REG = 127462;

  for (const letter of text.toLowerCase()) {
    big += alphabet.includes(letter) ? (":regional_indicator_"+letter+":&nbsp;") : "   ";
    small += alphabet.includes(letter) ? (String.fromCodePoint(alphabet.search(letter) + REG)+"&nbsp;") : "  ";
  }
  document.getElementById("reg-output-big").innerHTML = big;
  document.getElementById("reg-output-small").innerHTML = small;
}
