function updateDependents() {
    let secondDefinition = document.querySelector(".old.second").value;
    let metreDefinition = document.querySelector(".old.metre").value;
    let kilogramDefinitionM = document.querySelector(".old.kilogram-mantissa").value;
    let kilogramDefinitionE = document.querySelector(".old.kilogram-exponent").value;
    let kilogramDefinition = Math.pow(10, kilogramDefinitionE) * kilogramDefinitionM;
    
    document.querySelector(".new.second").innerText = (secondDefinition / 9192631770).toFixed(3);
    document.querySelector(".new.metre").innerText = ((299792458 / 9192631770) * (secondDefinition / metreDefinition )) .toFixed(3);
    document.querySelector(".new.kilogram").innerText = ((6.62607015e-34 * 9192631770 / (299792458 * 299792458)) * (metreDefinition*metreDefinition / (kilogramDefinition*secondDefinition))).toFixed(3);
}

document.querySelectorAll(".old").forEach(n => n.addEventListener("input", updateDependents));