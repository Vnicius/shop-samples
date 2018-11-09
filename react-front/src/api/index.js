import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1' // arrumar
});

export default class Api {
  static getCategories() {
    return apiInstance.get('/categories');
  }

  static getProducts() {
    return apiInstance.get('/products')
  }
}

