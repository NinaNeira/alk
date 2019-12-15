function checkMin() {
    let inputMin = document.querySelector('input[name="minutes"]');
    if(inputMin.value > 60) {
        inputMin.value='60';
    } else if(inputMin.value < 0) {
        inputMin.value = '0';
    }
}

function checkSec() {
    let inputSec = document.querySelector('input[name="seconds"]');

    if (inputSec.value > 60) {
        inputSec.value='60';
    } else if (inputSec.value < 0) {
        inputSec.value = '0';
    }
}

$(document).ready(function() {
    $('#start').click(function() {
        let minutes = $('input[name="minutes"]').val(),
            seconds = $('input[name="seconds"]').val();

        if(minutes > 0 || seconds > 0) {
            $('input').prop('disabled', true);

            function countDown({minutes, seconds}) {
                if (!minutes && seconds === '00') {
                    $('input').prop('disabled', false);

                    return;
                }

                setTimeout(function () {
                    if (seconds === '00' && minutes > 0) {
                        minutes = minutes - 1;
                        seconds = 60;
                    }

                    seconds = seconds - 1;

                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }

                    $('input[name="minutes"]').val(minutes);
                    $('input[name="seconds"]').val(seconds);
            
                    countDown({minutes, seconds});

                }, 1000);
            }  

            function init() {
                countDown({minutes, seconds});
            };
            
            init();
        };
    });
});