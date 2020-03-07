import { home, rooms, treatments, bookings, error }  from '../views';

export const routes = [
    { name: 'Home', path: '/', component: home, data: {} },
    { name: 'Rooms', path: '/rooms', component: rooms, data: {} },
    { name: 'Treatments', path: '/treatments', component: treatments, data: {} },
    { name: 'Bookings', path: '/bookings', component: bookings, data: {} }
];