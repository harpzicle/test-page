function updateDependents() {
    let secondDefinition = document.querySelector(".old.second").value;
    
    let metreDefinition = document.querySelector(".old.metre").value;
    
    let kilogramDefinitionM = document.querySelector(".old.kilogram-mantissa").value;
    let kilogramDefinitionE = document.querySelector(".old.kilogram-exponent").value;
    let kilogramDefinition = Math.pow(10, kilogramDefinitionE) * kilogramDefinitionM;
    
    let ampereDefinitionM = document.querySelector(".old.ampere-mantissa").value;
    let ampereDefinitionE = document.querySelector(".old.ampere-exponent").value;
    let ampereDefinition = Math.pow(10, ampereDefinitionE) * ampereDefinitionM;
    
    let kelvinDefinitionM = document.querySelector(".old.kelvin-mantissa").value;
    let kelvinDefinitionE = document.querySelector(".old.kelvin-exponent").value;
    let kelvinDefinition = Math.pow(10, kelvinDefinitionE) * kelvinDefinitionM;
    
    let moleDefinitionM = document.querySelector(".old.mole-mantissa").value;
    let moleDefinitionE = document.querySelector(".old.mole-exponent").value;
    let moleDefinition = Math.pow(10, moleDefinitionE) * moleDefinitionM;
    
    let candelaDefinition = document.querySelector(".old.candela").value;
    
    // revised definitions
    
    let newSecond = secondDefinition / 9192631770
    let newMetre = (299792458 / 9192631770) / (metreDefinition / secondDefinition)
    let newKilogram = (6.62607015e-34 * 9192631770 / (299792458 * 299792458))
                       / ((kilogramDefinition*secondDefinition) / (metreDefinition*metreDefinition));
    let newAmpere = (1.602176634e-19 * 9192631770) / (ampereDefinition * secondDefinition);
    let newKelvin = (6.62607015e-34 * 9192631770 / 1.380649e-23) * (kelvinDefinition / (kilogramDefinition * secondDefinition));
    let newMole = moleDefinition / 6.02214076e23;
    let newCandela = (683 * 6.62607015e-34 * 9192631770 * 9192631770) / (candelaDefinition * kilogramDefinition * secondDefinition * secondDefinition);
    
    document.querySelector(".new.second").innerText = newSecond.toFixed(3);
    document.querySelector(".new.metre").innerText =  newMetre.toFixed(3);
    document.querySelector(".new.kilogram").innerText = newKilogram.toFixed(3);
    document.querySelector(".new.ampere").innerText = newAmpere.toFixed(3);
    document.querySelector(".new.kelvin").innerText = newKelvin.toFixed(3);
    document.querySelector(".new.mole").innerText = newMole.toFixed(3);
    document.querySelector(".new.candela").innerText = newCandela.toFixed(3);
}

document.querySelectorAll(".old")
    .forEach(n => n.addEventListener("input", updateDependents));
document.querySelectorAll("[type='numeric']")
    .forEach(n => n.addEventListener("input", (event)=>{event.target.value = event.target.value.replace(/[^0-9.-]/g, '')}));