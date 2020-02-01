$(document).ready(function() {
    const login = $('input[name="login"]'),
          password = $('input[name="password"]');


        function buttonEnable() {
            $('input[name="login"], input[name="password"]').on('keyup', function () {
                if (login.val() && password.val()) {
                  $('.btn').attr("disabled", false);	
                } else {
                  $('.btn').attr("disabled", true);	
                }
            });
        }

        function passStrenght() {
            const averageReg = /^(?=.*?[A-Z]).{8,}$/,
                  strongReg = /^(?=.*?[A-Z])(?=.*?[0-9]).{12,}$/

            $('input[name="password"]').on('keyup', function () {
                if (password.val()) {
                    $('.weak').addClass('filled');
                } else {
                    $('.weak').removeClass('filled');
                }

                if (averageReg.test(password.val())) {
                    $('.average').addClass('filled');
                } else {
                    $('.average').removeClass('filled');
                }

                if (strongReg.test(password.val())) {
                    $('.strong').addClass('filled');
                } else {
                    $('.strong').removeClass('filled');
                }
            });
        }

        buttonEnable();
        passStrenght();
});