import $ from 'jquery';

export const treatments = () => {
    const fragment = $(new DocumentFragment());
    const h1 = $('<h1>Treatments</h1>');
    const p = $('<p>Lorem ipsum...</p>');

    fragment.append(h1).append(p);
    
    return fragment;
}