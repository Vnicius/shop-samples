window.onload = () => {
  function getQuery() {
    var result = {};
    var keyValuePairs = location.search.slice(1).split("&");

    keyValuePairs.forEach(valuePair => {
      valuePair = valuePair.split("=");
      result[decodeURIComponent(valuePair[0])] = decodeURIComponent(
        valuePair[1]
      );
    });

    return result;
  }

  function getProductById(id) {
    var product = {};

    products.forEach(p => {
      if (p.id === id) {
        product = p;
      }
    });

    return product;
  }

  function toProductsObj(shoppingList) {
    var result = [];

    shoppingList.forEach(p => {
      var product = getProductById(p);
      result.push(
        new Product(
          product.id,
          product.name,
          product.price,
          product.description,
          product.picture
        )
      );
    });
    return result;
  }

  const params = getQuery();
  const shoppingList = new ShoppingList();
  shoppingList.loadProducts(products);

  function fillProduct(product) {
    var productThumb = document.getElementById("product-thumb");
    var productName = document.getElementById("product-name");
    var productPrice = document.getElementById("product-price");
    var productDescription = document.getElementById("product-description");
    var productAdd = document.getElementById("product-btn-add");

    productThumb.setAttribute("src", product.getURL());
    productName.innerHTML = product.getName();
    productPrice.innerHTML = product.getPrice();
    productDescription.innerHTML = product.getDescription();
    productAdd.addEventListener("click", e => {
      e.preventDefault();
      var quant = sessionStorage.getItem(product.id);

      if (quant) {
        sessionStorage.setItem(product.id, (parseInt(quant) + 1).toString());
      } else {
        sessionStorage.setItem(product.id, "1");
      }
      shoppingList.addProduct(product);
    });
  }

  const categories = [
    "Automotivo",
    "Celulares e Comunicação",
    "Educação",
    "Eletrônicos, TV e Áudio",
    "Eletrodomésticos",
    "Eletroportáteis"
  ];

  var product = toProductsObj([params.id])[0];
  if (product) {
    fillProduct(product);
  } else {
    alert("Produto Inexistente");
  }

  /**
   * Gerar lista de categorias dinamicamento no HTML
   * @param {Array} categories Lista contendo as categorias
   */
  function generateCategoryList(categories) {
    const ul = document.getElementById("list-categories");

    categories.forEach(category => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      div.setAttribute("class", "category-button");

      div.addEventListener("click", function(e) {
        e.preventDefault();
        onClickCategory(category);
      });

      div.appendChild(document.createTextNode(category.getType()));
      li.appendChild(div);
      ul.appendChild(li);
    });
  }

  /**
   * Lista que irá conter os objetos Categoria
   */
  const categoriesList = [];
  /**
   * Popula a lista de categorias
   */
  categories.forEach(c => {
    categoriesList.push(
      new Category(
        c,
        products
          .filter(p => p.category === c)
          .map(
            product =>
              new Product(
                product.id,
                product.name,
                product.price,
                product.description,
                product.picture
              )
          )
      )
    );
  });
  generateCategoryList(categoriesList);
  cartHover(shoppingList);

  function setStack(categoryType) {
    const stackPages = document.getElementById("stack-pages");

    while (stackPages.firstChild) {
      stackPages.removeChild(stackPages.firstChild);
    }
    const a1 = document.createElement("a");
    a1.setAttribute("href", "../index.html");
    a1.appendChild(document.createTextNode("Home"));
    stackPages.appendChild(a1);

    stackPages.appendChild(document.createTextNode(" → "));

    const a2 = document.createElement("a");
    a2.setAttribute("href", `../index.html?category=${categoryType}`);
    a2.appendChild(document.createTextNode(categoryType));
    stackPages.appendChild(a2);

    stackPages.appendChild(document.createTextNode(" → "));

    const a3 = document.createElement("a");
    a3.setAttribute(
      "href",
      `index.html?id=${product.getID()}&category=${categoryType}`
    );
    a3.appendChild(document.createTextNode(product.getName()));
    stackPages.appendChild(a3);
  }

  setStack(params.category);

  function onClickCategory(category) {
    window.location.href = `../index.html?category=${category.type}`;
  }
};
