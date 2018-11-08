const API_URL = "/api/v1";
const API_URL_USERS = `${API_URL}/users`;
const API_URL_PRODUCTS = `${API_URL}/products`;
const API_URL_CATEGORIES = `${API_URL}/categories`;

// Categorias
// Create
function createCategory(category) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(API_URL_CATEGORIES, category);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}
// Read
function getCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(API_URL_CATEGORIES);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}
// Update
function updateCategory(category) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.put(`${API_URL_CATEGORIES}/${category.catid}`, category);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}
// Delete
function deleteCategory(categoryID) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`${API_URL_CATEGORIES}/${categoryID}`);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

//////// Products

// Create
function createProduct(product) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(API_URL_PRODUCTS, product);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}
// Read
function getProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(API_URL_PRODUCTS);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

// Read By ID
function getProductById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${API_URL_PRODUCTS}/${id}`);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

// Update
function updateProduct(product) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.put(`${API_URL_PRODUCTS}/${product.pid}`, product);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

// Delete
function deleteProduct(productID) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`${API_URL_PRODUCTS}/${productID}`);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}


/////////Users

// Create
function createUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(API_URL_USERS, user);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

// Read By ID
function getUserByLogin(login) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${API_URL_USERS}/${login}`);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}

// Delete
function deleteUser(userID) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`${API_URL_PRODUCTS}/${productID}`);
            resolve(res.data);
        } catch (e) {
            reject(e);
        }
    });
}