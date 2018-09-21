const axios = require("axios");

const API_URL = "/api/v1";
const API_URL_PRODUCTS = `${API_URL}/products`;
const API_URL_CATEGORIES = `${API_URL}/categories`;

function getProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(API_URL_PRODUCTS);
            resolve(res.body);
        } catch (e) {
            reject(e);
        }
    });
}

function getProductById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${API_URL_PRODUCTS}/${id}`);
            resolve(res.body);
        } catch (e) {
            reject(e);
        }
    });
}

function getCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(API_URL_CATEGORIES);
            resolve(res.body);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getCategories, getProducts, getProductById
};