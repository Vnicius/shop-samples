window.onload = () => {
  function getQuery() {
    var result = {};
    var keyValuePairs = location.search.slice(1).split("&");

    if (keyValuePairs[0] !== "") {
      keyValuePairs.forEach(valuePair => {
        valuePair = valuePair.split("=");
        result[decodeURIComponent(valuePair[0])] = decodeURIComponent(
          valuePair[1]
        );
      });

      return result;
    } else {
      return null;
    }
  }

  const shoppingList = new ShoppingList();
  shoppingList.loadProducts(products);

  var currentCategory = "";

  cartHover(shoppingList);

  /**
   * Constante para os tipos de categorias disponíveis
   */
  const categories = [
    "Automotivo",
    "Celulares e Comunicação",
    "Educação",
    "Eletrônicos, TV e Áudio",
    "Eletrodomésticos",
    "Eletroportáteis"
  ];

  function productPage(id) {
    window.location.href = `product/index.html?id=${id}&category=${currentCategory}`;
  }

  function showProductList(products) {
    const productList = document.getElementById("list-products");
    while (productList.firstChild) {
      productList.removeChild(productList.firstChild);
    }

    products.forEach(product => {
      const article = document.createElement("article");
      article.setAttribute("class", "product");

      const img = document.createElement("img");
      img.setAttribute("src", product.getURL());
      img.setAttribute("class", "product-thumb");
      img.addEventListener("click", function(e) {
        e.preventDefault();
        productPage(product.getID());
      });

      const a = document.createElement("a");
      a.setAttribute("href", "#");
      a.setAttribute("class", "product-name");
      a.appendChild(document.createTextNode(product.getName()));
      a.addEventListener("click", function(e) {
        e.preventDefault();
        productPage(product.getID());
      });

      const div = document.createElement("div");
      const strong = document.createElement("strong");
      strong.setAttribute("class", "product-price");
      strong.appendChild(document.createTextNode(`R$${product.getPrice()}`));

      const button = document.createElement("button");
      button.setAttribute("class", "product-btn-add");
      button.appendChild(document.createTextNode("Add"));

      button.addEventListener("click", function(e) {
        e.preventDefault();
        var quant = sessionStorage.getItem(product.id);

        if (quant) {
          sessionStorage.setItem(product.id, (parseInt(quant) + 1).toString());
        } else {
          sessionStorage.setItem(product.id, "1");
        }

        shoppingList.addProduct(product);
      });

      div.appendChild(strong);
      div.appendChild(button);

      article.appendChild(img);
      article.appendChild(a);
      article.appendChild(div);

      productList.appendChild(article);
    });
  }

  function onClickCategory(category) {
    currentCategory = category.getType();
    setStack(category.getType());
    showProductList(category.getProducts());
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

  //// Main

  var selectedCategory = getQuery();
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
  // categoriesList.forEach(cl => console.log(cl.getType(), cl.getProducts()));

  if (selectedCategory) {
    var categorySelected = categoriesList.filter(
      cat => cat.getType() === selectedCategory.category
    );

    if (categorySelected) {
      onClickCategory(categorySelected[0]);
    }
  }

  /**
   * Preeche lista no html dinamicamente
   */
  generateCategoryList(categoriesList);

  function setStack(categoryType) {
    const stackPages = document.getElementById("stack-pages");

    while (stackPages.firstChild) {
      stackPages.removeChild(stackPages.firstChild);
    }
    const a1 = document.createElement("a");
    a1.setAttribute("href", "index.html");
    a1.appendChild(document.createTextNode("Home"));
    stackPages.appendChild(a1);

    stackPages.appendChild(document.createTextNode(" → "));

    const a3 = document.createElement("a");
    a3.setAttribute("href", `index.html?category=${categoryType}`);
    a3.appendChild(document.createTextNode(categoryType));
    stackPages.appendChild(a3);
  }
};
