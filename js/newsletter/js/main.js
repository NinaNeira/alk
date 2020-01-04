$(document).ready(function() {
    const form = $('form'),
        name = $('input[name="name"]'),
        nameErr = $('.name-error'),
        email = $('input[name="email"]'),
        emailErr = $('.email-error');

    form.submit(function(e) {
        e.preventDefault();
        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;

        if (!reg.test(email.val())) {
            email.addClass('error');
            emailErr.text('Podaj prawidłowy adres email.');
            emailErr.show();
        }

        if (!name.val()) {
            name.addClass('error');
            nameErr.text('Podaj swoje imię.');
            nameErr.show();
        }

        if (reg.test(email.val()) && name.val()) {
            alert(name.val() + ', dziękujemy za zapisanie się do newslettera!')
            name.val('');
            email.val('');
        }
    });

    name.click(function() {
        $(this).removeClass('error');
        nameErr.hide();
    });

    email.click(function() {
        $(this).removeClass('error');
        emailErr.hide();
    });
});