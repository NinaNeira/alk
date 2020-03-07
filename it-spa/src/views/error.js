import $ from 'jquery';

export const error = () => {
    const fragment = $(new DocumentFragment());
    const h1 = $('<h1>Ooooops...</h1>');
    const p = $('<p>Page not found...</p>');

    fragment.append(h1).append(p);

    return fragment;
}