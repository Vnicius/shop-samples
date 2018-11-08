import axios from 'axios';

const apiInstance = axios.create({
  // baseURL: 'http://localhost:8080/api/v1' // arrumar
  baseURL: 'http://obras4d.tce.pb.gov.br:33307/api',
});

export default class Api {
  static getCategories() {
    // return apiInstance.get('/categories');
    return apiInstance.get('/pois');
  }
}

