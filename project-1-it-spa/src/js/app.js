import Router from 'vanilla-router';
import Handlebars from 'handlebars';
import { tns } from 'tiny-slider/src/tiny-slider';

import '../sass/main.scss';
import './templates';

import {
    isUserAuthenticated,
    userRegisterSendHandler,
    userLoginSendHandler,
    addRoomToCart,
    addTreatmentToCart,
    removeItem,
    deleteItem,
    deleteOrder,
    checkout,
    database,
    api,
} from './helpers';

window.addEventListener('load', () => {
    const el = $('.main__content--app');

    const errorTemplate = Handlebars.getTemplate('error');
    const homeTemplate = Handlebars.getTemplate('home');
    const roomsTemplate = Handlebars.getTemplate('rooms');
    const treatmentsTemplate = Handlebars.getTemplate('treatments');
    const registerTemplate = Handlebars.getTemplate('register');
    const loginTemplate = Handlebars.getTemplate('login');
    const userTemplate = Handlebars.getTemplate('user');
    const basketTemplate = Handlebars.getTemplate('basket');

    Handlebars.registerHelper('trim', function (string) {
        const newString = string.substring(0, 7);
        return new Handlebars.SafeString(newString);
    });

    const router = new Router({
        mode: 'history',
        page404: () => {
            isUserAuthenticated();

            const html = errorTemplate();
            el.html(html);
        },
    });

    router.add('/', async () => {
        try {
            isUserAuthenticated();

            $('body').css({ 'overflow-y': 'hidden' });
            $('.welcome__content--btn').click(function () {
                $('.welcome__content').animate({ top: '-100%' }, 1000);

                setTimeout(() => {
                    $('body').css({ 'overflow-y': 'scroll' });
                }, 1000);

                const slider = tns({
                    container: '.home__slider',
                    mode: 'gallery',
                    autoplay: true,
                    controls: false,
                    nav: false,
                    autoplayButtonOutput: false,
                    speed: 500,
                    autoplayTimeout: 10000,
                });
            });

            const html = homeTemplate();
            el.html(html);
        } catch (err) {
            console.log(err);
        }
    });

    router.add('/pokoje', async () => {
        try {
            isUserAuthenticated();

            const response = await database.get('/rooms');
            const data = response.data;

            const html = roomsTemplate({ data: data });
            el.html(html);

            $('.btn').on('click', (e) => {
                e.preventDefault();
                const target = $(e.currentTarget);
                addRoomToCart(target);
            });

            $('.rooms__date--arr').datepicker({
                orientation: 'bottom right',
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
            });

            $('.rooms__date--dep').datepicker({
                orientation: 'bottom right',
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
            });
        } catch (err) {
            console.log(err);
        }
    });

    router.add('/zabiegi', async () => {
        try {
            isUserAuthenticated();

            const response = await database.get('/treatments');
            const data = response.data;

            const html = treatmentsTemplate({ data: data });
            el.html(html);

            $('.btn').on('click', (e) => {
                e.preventDefault();
                const target = $(e.currentTarget);
                addTreatmentToCart(target);
            });
        } catch (err) {
            console.log(err);
        }
    });

    router.add('/rejestracja', async () => {
        try {
            isUserAuthenticated();

            const html = registerTemplate();
            el.html(html);

            $('.btn').click(userRegisterSendHandler);
        } catch (error) {
            console.log(error);
        }
    });

    router.add('/logowanie', async () => {
        try {
            isUserAuthenticated();

            const html = loginTemplate();
            el.html(html);

            $('.btn').click(userLoginSendHandler);
        } catch (error) {
            console.log(error);
        }
    });

    router.add('/wylogowanie', async () => {
        try {
            isUserAuthenticated();

            const response = await api.get('/user/logout');
            const data = response.data;

            const html = homeTemplate();
            el.html(html);

            if (data === 'logout') {
                isUserAuthenticated();

                $('.alert').remove();
                $('.home-slider').prepend(
                    '<div class="alert alert-success" role="alert">Wylogowano.</div>'
                );
            } else {
                $('.alert').remove();
                $('.home-slider').prepend(
                    '<div class="alert alert-danger" role="alert">Wystąpił błąd. Wiesz, jak to jest... Spróbuj ponownie.</div>'
                );
            }
        } catch (error) {
            console.log(error);
        }
    });

    router.add('/konto', async () => {
        try {
            isUserAuthenticated();

            const response = await api.get('/user/account');
            const data = response.data;

            console.log(data);

            const html = userTemplate({ data: data });
            el.html(html);

            if (data.length === 0) {
                $('.user-content').append(`
                <img src="img/no-orders.png" />
                <p>Nie masz żadnych zamówień</p>`);
            }

            $('.fa-plane-slash').on('click', (e) => {
                e.preventDefault();

                const target = $(e.currentTarget);
                const orderId = $(target).attr('data-order');

                $('.confirm-cancel').attr('data-id', orderId);
            });

            $('.confirm-cancel').on('click', (e) => {
                e.preventDefault();

                const target = $(e.currentTarget);
                deleteOrder(target);

                const targetId = $('.confirm-cancel').attr('data-id');

                $('#order-cancel').modal('hide');
                $(`#${targetId}`).remove();

                if (data.length === 0) {
                    $('.user-content').append(`
                    <img src="img/no-orders.png" />
                    <p>Nie masz żadnych`);
                }
            });

            if (data === 'not logged in') {
                $('.user-content')
                    .html('')
                    .prepend(
                        `<div class="alert alert-danger" role="alert">Musisz się najpierw zalogować</div>`
                    ).append(`
                <img src="img/user.svg" />
                <a href="/logowanie">Przejdź do strony logowania</a>`);
            }
        } catch (err) {
            console.log(err);
        }
    });

    router.add('/koszyk', async () => {
        try {
            isUserAuthenticated();

            const response = await database.get('/basket');
            const data = response.data;

            const html = basketTemplate({ data: data });
            el.html(html);

            $('.fa-minus-square').on('click', (e) => {
                e.preventDefault();
                const target = $(e.currentTarget);
                removeItem(target);
            });

            $('.fa-trash-alt').on('click', (e) => {
                e.preventDefault();
                const target = $(e.currentTarget);
                deleteItem(target);
            });

            $('.btn').click(checkout);
        } catch (err) {
            console.log(err);
        }
    });

    router.navigateTo(window.location.pathname);

    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        event.preventDefault();
        const target = $(event.currentTarget);
        $('.nav-link').removeClass('active');
        target.addClass('active');

        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });
});
