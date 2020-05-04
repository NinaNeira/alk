export const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

export const database = axios.create({
    baseURL: '/database',
    timeout: 5000,
});

export const addRoomToCart = async (target) => {
    try {
        const targetId = $(target).attr('data-id');
        const dateArr = $('.rooms__date--arr').val();
        const dateDep = $('.rooms__date--dep').val();

        if (!dateArr || !dateDep) {
            $('.alert').remove();
            $('.rooms__content').prepend(
                '<div class="alert alert-danger" role="alert">Wybierz okres pobytu.</div>'
            );
        } else {
            const response = await database.get(
                `/rooms/${targetId}/${dateArr.replace(
                    /\//g,
                    ''
                )}/${dateDep.replace(/\//g, '')}`
            );

            const data = response.data;

            if (data === 'added') {
                $('.alert').remove();
                $('.rooms__content').prepend(
                    '<div class="alert alert-success" role="alert">Pokój dodany do koszyka.</div>'
                );
            }

            if (data === 'exists') {
                $('.alert').remove();
                $('.rooms__content').prepend(
                    '<div class="alert alert-danger" role="alert">Dodałeś już ten pokój! Aby go usunąć, przejdź do koszyka.</div>'
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
};

export const addTreatmentToCart = async (target) => {
    try {
        const targetId = $(target).attr('data-id');
        const response = await database.get(`/treatments/${targetId}`);
        const data = response.data;

        if (data === 'added') {
            $('.alert').remove();
            $('.treatments__content').prepend(
                '<div class="alert alert-success" role="alert">Zabieg dodany do koszyka.</div>'
            );
        }

        if (data === 'max') {
            $('.alert').remove();
            $('.treatments__content').prepend(
                '<div class="alert alert-danger" role="alert">Możesz dodać maksymalnie 3 sesje jednego zabiegu. Aby edytować, przejdź do koszyka.</div>'
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const removeItem = async (target) => {
    try {
        const targetId = $(target).attr('data-id');
        const response = await database.get(`/basket/remove/${targetId}`);
        const data = response.data;

        $('.alert').remove();
        $('.basket__header').append(
            '<div class="alert alert-success" role="alert">Usunięto z koszyka.</div>'
        );

        if (!(targetId in data.items)) {
            $(`#${targetId}`).fadeOut();
            $('#basket-total-price').text(data.totalPrice);
        } else {
            $(`#qty-${targetId}`).text(data.items[targetId].qty);
            $('#basket-total-price').text(data.totalPrice);
        }

        if (data.totalQty === 0) {
            $('.basket__content').html(
                `<div class="row w-100 pb-5 justify-content-md-center">
                <img src="img/empty-basket.png" class="basket__content-img" alt="Koszyk jest pusty" />
            </div>
            <div class="row w-100 p-0 justify-content-md-center">    
                <p>Twój koszyk jest pusty.</p>
            </div>`
            );

            $('.alert').remove();
            $('.basket__header').append(
                '<div class="alert alert-success" role="alert">Usunięto z koszyka.</div>'
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const deleteItem = async (target) => {
    try {
        const targetId = $(target).attr('data-id');
        const response = await database.get(`/basket/delete/${targetId}`);
        const data = response.data;

        $('.alert').remove();
        $('.basket__header').append(
            '<div class="alert alert-success" role="alert">Usunięto z koszyka.</div>'
        );

        if (!(targetId in data.items)) {
            $(`#${targetId}`).fadeOut();
            $('#basket-total-price').text(data.totalPrice);
        }

        if (data.totalQty === 0) {
            $('.basket__content').html(
                `<div class="row w-100 pb-5 justify-content-md-center">
                <img src="img/empty-basket.png" class="basket__content-img" alt="Koszyk jest pusty" />
            </div>
            <div class="row w-100 p-0 justify-content-md-center">    
                <p>Twój koszyk jest pusty.</p>
            </div>`
            );

            $('.alert').remove();
            $('.basket__header').append(
                '<div class="alert alert-success" role="alert">Usunięto z koszyka.</div>'
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const checkout = async () => {
    try {
        const response = await database.get('/checkout');
        const data = response.data;

        if (data === 'empty') {
            $('.alert').remove();
            $('.basket__header').append(
                '<div class="alert alert-danger" role="alert">Dodaj najpierw coś do koszyka!</div>'
            );
        }

        if (data === 'notlogged') {
            $('.alert').remove();
            $('.basket__header').append(
                '<div class="alert alert-danger" role="alert">Musisz się najpierw zalogować.</div>'
            );
        }

        if (data === 'success') {
            $('.alert').remove();
            $('.basket__header').append(
                '<div class="alert alert-success" role="alert">Twoje zamówienie zostało złożone. Dziękujemy!</div>'
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const deleteOrder = async (target) => {
    try {
        const targetId = $(target).attr('data-id');
        const response = await database.get(`/order/delete/${targetId}`);
        const data = response.data;

        if (data === 'success') {
            $('.alert').remove();
            $('.user').prepend(
                '<div class="alert alert-success" role="alert">Rezerwacja anulowana.</div>'
            );
            $(`#${targetId}`).remove();
        }

        if (data === 'error') {
            $('.alert').remove();
            $('.user').prepend(
                '<div class="alert alert-danger" role="alert">Wystąpił błąd. Wiesz, jak to jest... Spróbuj ponownie.</div>'
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const isUserAuthenticated = async () => {
    try {
        const response = await api.get('/user');
        const data = response.data;

        if (data === true) {
            $('a[href$="/logowanie"]').hide();
            $('a[href$="/wylogowanie"]').css('display', 'inline-block');
            $('a[href$="/konto"]').css('display', 'inline-block');
        } else {
            $('a[href$="/logowanie"]').css('display', 'inline-block');
            $('a[href$="/wylogowanie"]').hide();
            $('a[href$="/konto"]').hide();
        }
    } catch (err) {
        console.log(err);
    }
};

const userRegisterHandler = async () => {
    const mail = $('#mail').val();
    const pass = $('#pass').val();

    try {
        const response = await api.post('/user/register', {
            mail,
            pass,
        });
        const data = response.data;

        if (data.name === 'UserExistsError') {
            $('.alert').remove();
            $('.register').prepend(
                '<div class="alert alert-danger" role="alert">Konto z takim adresem e-mail już istnieje.</div>'
            );
            $('#username').addClass('is-invalid');
        } else if (data.errors) {
            $('.alert').remove();
            $('.register').prepend(
                '<div class="alert alert-danger" role="alert"></div>'
            );

            for (const error in data.errors) {
                $('.alert').append(data.errors[error].msg + '<br />');
                $('#' + data.errors[error].param).addClass('is-invalid');
            }
        }

        if (data === 'success') {
            $('.alert').remove();
            $('.register').prepend(
                '<div class="alert alert-success" role="alert">Rejestracja pomyślna!</div>'
            );
        }
    } catch (error) {
        console.log(error);
    }
};

const userLoginHandler = async () => {
    const mail = $('#mail').val();
    const pass = $('#pass').val();

    try {
        const response = await api.post('/user/login', {
            withCredentials: true,
            mail,
            pass,
        });
        const data = response.data;

        console.log(data);

        if (data.message === 'Missing credentials') {
            $('.alert').remove();
            $('.login').prepend(
                `<div class="alert alert-danger" role="alert">Podaj dane logowania.</div>`
            );
            $('#mail').addClass('is-invalid');
            $('#pass').addClass('is-invalid');
        }

        if (data.name === 'IncorrectUsernameError') {
            $('.alert').remove();
            $('.login').prepend(
                `<div class="alert alert-danger" role="alert">Niepoprawna nazwa użytkownika.</div>`
            );
            $('#mail').addClass('is-invalid');
        }

        if (data.name === 'IncorrectPasswordError') {
            $('.alert').remove();
            $('.login').prepend(
                `<div class="alert alert-danger" role="alert">Niepoprawne hasło.</div>`
            );
            $('#pass').addClass('is-invalid');
        }

        if (data === 'success') {
            $('.alert').remove();
            $('.login').prepend(
                '<div class="alert alert-success" role="alert">Zalogowano.</div>'
            );
        }
    } catch (error) {
        console.log(error);
    }
};

export const userRegisterSendHandler = () => {
    $(':input').each(function () {
        $(this).removeClass('is-invalid');
    });
    userRegisterHandler();
    return false;
};

export const userLoginSendHandler = () => {
    $(':input').each(function () {
        $(this).removeClass('is-invalid');
    });
    userLoginHandler();
    return false;
};
