export class Cart {
    constructor() {
        this.key = 'IT_SPA_CART';

        if (!this.exists) {
            this.setItSpaCart([]);
        }
    }

    get() {
        const cookies = document.cookie.split(';');
        cookies.find(cookie => cookie.startsWith(this.key));
    }

    exists() {
        return this.get() !== undefined;
    }

    getItSpaCart() {
        const cookieValue = this.get().slice(12);
        const parsedValue = JSON.parse(cookieValue);

        return parsedValue;
    }

    setItSpaCart(val) {
        const stringifiedVal = JSON.stringify(val);
        document.cookie = `${this.key}=${stringifiedVal}`;
    }

    add(item) {
       const cartValue = this.getItSpaCart();
       this.setItSpaCart([...cartValue, item]); 
    }

    remove(item) {
        const cartValue = this.getItSpaCart();
        const itemInCart = cartValue.findIndex(val => val.name === item.name);

        if (itemInCart !== -1) {
            cartValue.splice(itemInCart, 1);
            this.setItSpaCart(cartValue);
        }
    }
}