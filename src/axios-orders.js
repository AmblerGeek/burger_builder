import axios from 'axios';

const instance = axios.create( {
    baseURL: 'https://react-myburger-a03b7.firebaseio.com/'
});

export default instance;
