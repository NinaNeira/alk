$(document).ready(function() {
    function getNumber() {
        $('button').on('click', function() {
            let number = '';
            const display = $('.display');
            number = parseInt(number);

            if($('button').attr('data-action') === 'add') {
                let firstNumber = display.text();
                let operator = 'add';
            }

            if (operator === 'calculate') {
                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayedNum
                
                display.textContent = calculate(firstValue, operator, secondValue)
              }

            if(display.text() == 0) {
                
                display.text(number);
            } else {
                display.text(display.text() + number);
            }
        });
    }

    getNumber();
});