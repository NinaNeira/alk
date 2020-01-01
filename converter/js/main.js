function celsConv() {
    let cels = document.querySelector('input[name="cels"]').value,
        fahr = (cels * (9/5)) + 32,
        fahrIn = document.querySelector('input[name="fahr"]');

    fahr = fahr.toFixed(1);
    fahrIn.disabled = true;

    return fahrIn.value = fahr;
}

 function fahrConv() {
    let fahr = document.querySelector('input[name="fahr"]').value,
        cels = (fahr - 32) * (5/9),
        celsIn = document.querySelector('input[name="cels"]');

    cels = cels.toFixed(1);

    return celsIn.value = cels;
}

function revert() {
    switchName();
    switchLabel();
    switchVal();
    switchKeyUp();
}

function switchVal() {
    let celsIn = document.querySelector('input[name="cels"]'),
        cels = celsIn.value,
        fahrIn = document.querySelector('input[name="fahr"]'),
        fahr = fahrIn.value,
        switchedValCels = fahr,
        switchedValFahr = cels;

    celsIn.value = switchedValCels;
    fahrIn.value = switchedValFahr;
}

function switchKeyUp() {
    let celsIn = document.querySelector('input[name="cels"]'),
        fahrIn = document.querySelector('input[name="fahr"]');

    if (celsIn.getAttribute('onkeyup') !== 'celsConv()') {
        celsIn.setAttribute('onkeyup', 'celsConv()');
    }

    if (fahrIn.getAttribute('onkeyup') !== 'fahrConv()') {
        fahrIn.setAttribute('onkeyup', 'fahrConv()'); 
    }
}

function switchLabel() {
    let labelCels = document.querySelector('label[for="cels"]'),
        labelFahr = document.querySelector('label[for="fahr"]'),
        switchedlabelCels = labelFahr.innerText,
        switchedlabelFahr = labelCels.innerText;

    labelCels.innerText = switchedlabelCels;
    labelFahr.innerText = switchedlabelFahr;
}

function switchName() {
    let celsIn = document.querySelector('input[name="cels"]'),
        fahrIn = document.querySelector('input[name="fahr"]'),
        switchedNameCels = fahrIn.getAttribute('name'),
        switchedNameFahr = celsIn.getAttribute('name');

    celsIn.setAttribute('name', switchedNameCels);
    fahrIn.setAttribute('name', switchedNameFahr);   
}