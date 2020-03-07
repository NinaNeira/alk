import $ from 'jquery';

export const navItem = (route) => {
    const li = $(`<li></li>`);
    const a = $(`<a class="text-light">${route.name}</a>`);

    a.on('click', (e) => {
        e.preventDefault();

        a.trigger('routechange', { path: route.path });
    });

    li.append(a);

    return li;
}