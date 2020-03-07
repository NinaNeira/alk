import $ from 'jquery';
import { error } from '../views/error';


export class Router {
    constructor(routes) {
        this.routes = routes;
        this.outlet;
        this.body = $(document.body);
    }

    mount(outlet) {
        this.outlet = outlet;
        this.body.on('routechange', (e, detail) => {
            const { path } = detail;
            this.navigate(path);
        });
    }

    init() {
        const path = location.pathname;
        this.navigate(path);
    }

    get(path) {
        return this.routes.find(route => route.path === path);
    }

    has(path) {
        return this.get(path) !== undefined;
    }

    navigate(path, data = {}) {
        if (this.has(path)) {
            const { component } = this.get(path);
            const html = component();

            this.outlet.empty().append(html);
        } else {
            this.outlet.empty().append(error);
        }

        history.pushState(data, '', path);
    }
}